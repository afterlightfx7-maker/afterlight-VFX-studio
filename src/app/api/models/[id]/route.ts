import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import ModelAsset from "@/models/ModelAsset";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const body = await req.json();
    
    if (body.id) delete body.id;
    
    const updatedModel = await ModelAsset.findByIdAndUpdate(id, body, { new: true });
    if (!updatedModel) {
      return NextResponse.json({ error: "Model not found" }, { status: 404 });
    }
    return NextResponse.json(updatedModel);
  } catch (error: any) {
    console.error("PUT Model Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectToDatabase();
    const { id } = await params;
    
    const deletedModel = await ModelAsset.findByIdAndDelete(id);
    if (!deletedModel) {
      return NextResponse.json({ error: "Model not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Model deleted successfully" });
  } catch (error: any) {
    console.error("DELETE Model Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
