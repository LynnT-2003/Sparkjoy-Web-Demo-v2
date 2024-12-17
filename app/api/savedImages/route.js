import connectMongoDB from "@/lib/mongodb";
import UserImages from "../../../models/imageResponseModel";
import { NextResponse } from "next/server";

// POST method to save image data
export async function POST(req) {
  try {
    const { delayTime, executionTime, image, prompt, userId, username } =
      await req.json();

    if (!userId) {
      return NextResponse.json(
        { error: "userId is required to save the image." },
        { status: 400 }
      );
    }

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

// export async function DELETE(req) {
//   try {
//     const { id } = await req.json();

//     await connectMongoDB();

//     const result = await UserImages.findOneAndUpdate(
//       { "images._id": id }, // Search for the image by ID
//       { $pull: { images: { _id: id } } } // Remove the image from the array
//     );

//     if (!result) {
//       return NextResponse.json({ error: "Image not found." }, { status: 404 });
//     }

//     return NextResponse.json(
//       { message: "Image deleted successfully!" },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Failed to delete image:", error);
//     return NextResponse.json(
//       { error: "Failed to delete image." },
//       { status: 500 }
//     );
//   }
// }

export async function DELETE(req) {
  try {
    // Extracting the image URL (or _id) from the request body
    const { imageUrl } = await req.json(); // Assuming imageUrl is passed to delete the image

    // Connecting to MongoDB
    await connectMongoDB();

    // Find the user and pull the image from the images array based on the imageUrl
    const result = await UserImages.findOneAndUpdate(
      { "images.image": imageUrl }, // Searching for the image by URL in the array
      { $pull: { images: { image: imageUrl } } }, // Pull (remove) the image object from the array
      { new: true } // Return the updated document
    );

    // Check if the image was found and deleted
    if (!result) {
      return NextResponse.json({ error: "Image not found." }, { status: 404 });
    }

    // Successfully deleted image
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

// import connectMongoDB from "@/lib/mongodb";
// import User from "../../../models/userModel";
// import Image from "../../../models/imageModel";
// import { NextResponse } from "next/server";

// // POST method to save image data
// export async function POST(req) {
//   try {
//     const { delayTime, executionTime, imageUrl, prompt, userId } =
//       await req.json();

//     await connectMongoDB();

//     // Create and save the new image document
//     const newImage = new Image({
//       delayTime,
//       executionTime,
//       imageUrl,
//       prompt,
//     });
//     await newImage.save();

//     // Find the user and push the new image ID to their images array
//     const user = await User.findOneAndUpdate(
//       { userId },
//       { $push: { images: newImage._id } },
//       { new: true, upsert: true }
//     );

//     if (!user) {
//       return NextResponse.json({ error: "User not found." }, { status: 404 });
//     }

//     return NextResponse.json(
//       { message: "Image saved successfully!", user },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("Failed to save image:", error);
//     return NextResponse.json(
//       { error: "Failed to save image." },
//       { status: 500 }
//     );
//   }
// }

// // GET method to fetch images for a specific user
// export async function GET(req) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const userId = searchParams.get("userId");

//     await connectMongoDB();

//     // Find user and populate their images array with image documents
//     const user = await User.findOne({ userId }).populate("images").exec();

//     if (!user || !user.images.length) {
//       return NextResponse.json(
//         { error: "No images found for this user." },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(user.images, { status: 200 });
//   } catch (error) {
//     console.error("Failed to fetch images:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch images." },
//       { status: 500 }
//     );
//   }
// }

// // DELETE method to delete an image by ID and remove reference from the user
// export async function DELETE(req) {
//   try {
//     const { id } = await req.json();

//     await connectMongoDB();

//     // Find and delete the image document
//     const result = await Image.findByIdAndDelete(id);

//     if (!result) {
//       return NextResponse.json({ error: "Image not found." }, { status: 404 });
//     }

//     // Remove the image reference from the user's images array
//     await User.findOneAndUpdate({ images: id }, { $pull: { images: id } });

//     return NextResponse.json(
//       { message: "Image deleted successfully!" },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Failed to delete image:", error);
//     return NextResponse.json(
//       { error: "Failed to delete image." },
//       { status: 500 }
//     );
//   }
// }
