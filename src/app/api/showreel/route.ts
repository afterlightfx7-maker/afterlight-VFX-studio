import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import ShowreelModel from "@/models/Showreel";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectToDatabase();
    // Always return the single showreel document (or empty if none)
    const showreel = await ShowreelModel.findOne({}).sort({ createdAt: -1 });
    return NextResponse.json(showreel || { videoUrl: "", title: "AFTERLIGHTFX REEL 2026" });
  } catch (error: any) {
    console.error("GET Showreel Error:", error);
    return NextResponse.json({ videoUrl: "", title: "AFTERLIGHTFX REEL 2026" });
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();

    // Delete any old showreel and replace with one new document
    await ShowreelModel.deleteMany({});
    const showreel = await ShowreelModel.create(body);
    return NextResponse.json(showreel, { status: 201 });
  } catch (error: any) {
    console.error("POST Showreel Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
