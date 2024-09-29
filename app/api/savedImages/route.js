import connectMongoDB from "@/lib/mongodb";
import imageResponseModel from "../../../models/imageResponseModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json(); // Parse the request body

    const { delayTime, executionTime, images, info } = body;

    await connectMongoDB(); // Ensure MongoDB is connected

    const newResponse = new imageResponseModel({
      delayTime,
      executionTime,
      images,
      info,
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
    const allResponses = await imageResponseModel.find(
      {},
      { images: 1, _id: 0 }
    );

    // Extract the "images" from each document
    const imagesArray = allResponses.flatMap((doc) => doc.images);

    return NextResponse.json(imagesArray, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch images:", error);
    return NextResponse.json(
      { error: "Failed to fetch images." },
      { status: 500 }
    );
  }
}
