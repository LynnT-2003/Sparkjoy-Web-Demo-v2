"use client";
import React, { useState, useEffect } from "react";
import cloudinary from "cloudinary";
import { User } from "firebase/auth";
import Image from "next/image";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

interface ImageObject {
  _id: string;
  image: string; // base64-encoded image string
  prompt: string;
}

interface HistoryImagesSectionProps {
  homeImages: ImageObject[]; // Array of image objects
}

const HistoryImagesSection: React.FC<HistoryImagesSectionProps> = ({
  homeImages: initialImages,
}) => {
  const [homeImages, setHomeImages] = useState<ImageObject[]>(initialImages);

  const handleDelete = async (imageUrl: string) => {
    try {
      const response = await fetch("/api/savedImages", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageUrl }), // Send the image ID in the body
      });

      if (response.ok) {
        console.log("Image deleted successfully");
        // Remove the image from the local state after deletion
        setHomeImages((prevImages) =>
          prevImages.filter((image) => image.image !== imageUrl)
        );
      } else {
        console.error("Failed to delete image");
      }
    } catch (error) {
      console.error("Error while deleting image:", error);
    }

    // const urlParts = imageUrl.split("/");
    // const publicIdWithExtension = urlParts[urlParts.length - 1];
    // const publicId = publicIdWithExtension.split(".")[0];

    console.log("Deleting image in Cloudinary with URL:", imageUrl);
    const cloudinaryResponse = await fetch("/api/upload-to-cloudinary", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageUrl }), // Send the public ID in the body
    });

    if (cloudinaryResponse.ok) {
      console.log("Image deleted from Cloudinary successfully");
    } else {
      console.error("Failed to delete image from Cloudinary");
    }
  };

  useEffect(() => {
    // If you want to fetch the latest data from API, do it here.
    console.log("Image has been generated and saved to history");
    setHomeImages(initialImages); // This will update the state if props change
  }, [initialImages]);

  return (
    <div className="px-24 mt-[-1.355rem] w-full">
      <h2 className="text-xl font-bold mt-12 mb-6 pl-2">
        History of Generated Images
      </h2>
      {!homeImages ? (
        <div className="flex justify-center items-center h-20">
          <div className="w-24 h-2 bg-gray-300 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 animate-pulse"></div>
          </div>
          <p className="ml-4">Loading...</p>
        </div>
      ) : homeImages.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pb-24 gap-6">
            {homeImages
              .slice()
              .reverse()
              .map(({ _id, image, prompt }, index) => (
                <CardContainer className="inter-var" key={index}>
                  <CardBody className="relative group/card dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full h-full rounded-xl p-6 px-2 border">
                    <CardItem translateZ="100" className="w-full mt-0">
                      <Image
                        src={image} // Use base64 string from image object
                        height={1000}
                        width={1000}
                        className="object-cover rounded-xl group-hover/card:shadow-xl"
                        alt={`Image with prompt: ${prompt}`}
                      />
                    </CardItem>
                    <CardItem translateZ="50" className="mt-4 text-white">
                      <p className="font-bold">Prompt: {prompt}</p>
                      <button
                        className="mt-4 text-red-500 hover:text-red-700"
                        onClick={() => handleDelete(image)}
                      >
                        Delete
                      </button>
                    </CardItem>
                  </CardBody>
                </CardContainer>
              ))}
          </div>
        </>
      ) : (
        <div>{/* <p>No images generated yet!</p> */}</div>
      )}
    </div>
  );
};

export default HistoryImagesSection;
