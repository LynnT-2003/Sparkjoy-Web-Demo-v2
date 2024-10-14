import connectMongoDB from "@/lib/mongodb";
import imageResponseModel from "../../../models/imageResponseModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json(); // Parse the request body
    console.log("Received body:", body); // Log the body to check

    const { delayTime, executionTime, image, prompt } = body;

    await connectMongoDB(); // Ensure MongoDB is connected

    const newResponse = new imageResponseModel({
      delayTime,
      executionTime,
      image,
      prompt,
    });

    await newResponse.save();

    return NextResponse.json(
      { message: "Response saved successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to save response:", error);
    return NextResponse.json(
      { error: "Failed to save response." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectMongoDB(); // Ensure MongoDB is connected

    // Fetch all documents and project only the "images" field
    const allResponses = await imageResponseModel.find({});

    return NextResponse.json(allResponses, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch images:", error);
    return NextResponse.json(
      { error: "Failed to fetch images." },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const { id } = await req.json();

    await connectMongoDB();

    const result = await imageResponseModel.findByIdAndDelete(id);

    if (!result) {
      return NextResponse.json({ error: "Image not found." }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Image deleted successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to delete image:", error);
    return NextResponse.json(
      { error: "Failed to delete image." },
      { status: 500 }
    );
  }
}
