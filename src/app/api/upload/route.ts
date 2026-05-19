import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
  try {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      console.warn("Cloudinary keys are not fully set up. Using data URI fallback.");
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // If Cloudinary is not configured, fall back to returning a base64 Data URI
    // so the app remains fully functional in local development without keys!
    if (!cloudName || !apiKey || !apiSecret) {
      const mime = file.type || "application/octet-stream";
      const base64 = buffer.toString("base64");
      return NextResponse.json({
        url: `data:${mime};base64,${base64}`,
        public_id: `fallback_${Date.now()}`
      });
    }

    // Promise wrapper for Cloudinary stream uploader
    const uploadToCloudinary = (fileBuffer: Buffer): Promise<any> => {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "afterlight_studio",
            resource_type: "auto", // Automatically handles images, videos, or raw binary (.glb) files!
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        uploadStream.end(fileBuffer);
      });
    };

    const result = await uploadToCloudinary(buffer);

    return NextResponse.json({ 
      url: result.secure_url,
      public_id: result.public_id
    });

  } catch (error: any) {
    console.error("Upload Route Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
