import cloudinary from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  try {
    const { base64Image } = await req.json();

    if (!base64Image) {
      return NextResponse.json(
        { error: "No image data provided" },
        { status: 400 }
      );
    }

    // Decode the base64 image to a buffer
    const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, ""); // Remove data URL prefix
    const imageBuffer = Buffer.from(base64Data, "base64");

    console.log("Image data successfully decoded!");

    // Upload the image buffer to Cloudinary using upload_stream
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.v2.uploader.upload_stream(
        { resource_type: "image" },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      // Pipe the image buffer to the Cloudinary upload stream
      uploadStream.end(imageBuffer);
    });

    console.log("Cloudinary upload completed successfully:", uploadResult);

    // Return the URL of the uploaded image
    return NextResponse.json(
      { status: "Good", url: uploadResult.secure_url },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during upload:", error);
    return NextResponse.json(
      { error: "Error uploading to Cloudinary", details: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const { imageUrl } = await req.json();

    if (!imageUrl) {
      return NextResponse.json(
        { error: "No image URL provided" },
        { status: 400 }
      );
    }

    // Extract public_id from the URL
    const urlParts = imageUrl.split("/");
    const publicIdWithExtension = urlParts[urlParts.length - 1];
    const publicId = publicIdWithExtension.split(".")[0]; // Remove the file extension

    console.log("Deleting image with public ID:", publicId);

    // Use Cloudinary's API to delete the image by public_id
    const deleteResult = await new Promise((resolve, reject) => {
      cloudinary.v2.uploader.destroy(
        publicId,
        { resource_type: "image" },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
    });

    console.log("Cloudinary delete completed successfully:", deleteResult);

    return NextResponse.json(
      { status: "Good", result: deleteResult },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during deletion:", error);
    return NextResponse.json(
      { error: "Error deleting from Cloudinary", details: error.message },
      { status: 500 }
    );
  }
}
