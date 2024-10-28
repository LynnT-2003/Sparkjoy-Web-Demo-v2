import connectMongoDB from "@/lib/mongodb";
import UserImages from "../../../models/imageResponseModel";
import { NextResponse } from "next/server";

// POST method to save image data
export async function POST(req) {
  try {
    const { delayTime, executionTime, image, prompt, userId, username } =
      await req.json();

    // Connect to MongoDB
    await connectMongoDB();

    // Upsert (update if exists, otherwise create a new entry)
    const user = await UserImages.findOneAndUpdate(
      { userId }, // Search by userId
      {
        $set: { username }, // Update username if it changes
        $setOnInsert: { userId }, // Only set userId on insert
        $push: {
          images: {
            $each: [{ delayTime, executionTime, image, prompt }], // Ensure each image is pushed properly
          },
        },
      },
      { upsert: true, new: true }
    );

    return NextResponse.json(
      { message: "Image saved successfully!", user },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to save image:", error);
    return NextResponse.json(
      { error: "Failed to save image." },
      { status: 500 }
    );
  }
}

// GET method to fetch images for a specific user
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId"); // Get userId from query parameters

    await connectMongoDB(); // Ensure MongoDB is connected

    // Fetch user by userId and project only the "images" field
    const userImages = await UserImages.findOne({ userId }, { images: 1 });

    if (!userImages) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    return NextResponse.json(userImages.images, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch images:", error);
    return NextResponse.json(
      { error: "Failed to fetch images." },
      { status: 500 }
    );
  }
}

// DELETE method to delete an image by ID
export async function DELETE(req) {
  try {
    const { id } = await req.json();

    await connectMongoDB();

    const result = await UserImages.findOneAndUpdate(
      { "images._id": id }, // Search for the image by ID
      { $pull: { images: { _id: id } } } // Remove the image from the array
    );

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
