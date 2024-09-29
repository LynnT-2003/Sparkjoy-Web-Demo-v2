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
