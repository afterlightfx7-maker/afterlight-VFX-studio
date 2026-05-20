import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET() {
  try {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      console.warn("Cloudinary keys are not fully set up. Client will use data URI fallback.");
      return NextResponse.json({ fallback: true });
    }

    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature = cloudinary.utils.api_sign_request(
      {
        timestamp: timestamp,
        folder: "afterlight_studio",
      },
      apiSecret
    );

    return NextResponse.json({ 
      signature, 
      timestamp, 
      apiKey, 
      cloudName 
    });

  } catch (error: any) {
    console.error("Signature Route Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
