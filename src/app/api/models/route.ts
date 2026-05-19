import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import ModelAsset from "@/models/ModelAsset";

export async function GET() {
  try {
    await connectToDatabase();
    const models = await ModelAsset.find({}).sort({ createdAt: -1 });
    return NextResponse.json(models);
  } catch (error: any) {
    console.error("GET Models Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    
    if (body.id) delete body.id;
    
    const newModel = await ModelAsset.create(body);
    return NextResponse.json(newModel, { status: 201 });
  } catch (error: any) {
    console.error("POST Model Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
