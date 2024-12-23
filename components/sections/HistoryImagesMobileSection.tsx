"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Trash2 } from "lucide-react";

import { onAuthStateChange, User } from "@/lib/firebase";

interface ImageObject {
  _id: string;
  image: string; // base64-encoded image string
  prompt: string;
}

const HistoryImagesMobileSection = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [images, setImages] = useState<ImageObject[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchSavedImages = async (userId: string) => {
    console.log("Fetching..?");
    try {
      console.log("Fetching from API for user:", userId);
      const response = await fetch(`/api/savedImages?userId=${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch saved images");
      }

      const data = await response.json();
      setImages(data || []); // Now expecting an array of image objects
      setLoading(false); // Stop loading after fetching images
      console.log("Fetched images:", data);
    } catch (error) {
      console.error("Error fetching saved images:", error);
      setLoading(false); // Stop loading even if there's an error
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      if (user) {
        setUser(user);
        console.log("User is now: ", user);
        fetchSavedImages(user.uid); // Fetch images when the user logs in
      } else {
        setUser(null);
        setImages([]);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

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
        setImages((prevImages) =>
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

  const handleImageRoute = (imageUrl: string) => {
    const imageName = imageUrl.split("/").pop()?.split(".")[0]; // Extract the image name
    if (imageName) {
      router.push(`/history/${imageName}`);
    }
  };

  return (
    <div className="w-full">
      <h1 className="font-sans text-2xl ml-[4rem] py-[1.1rem] sm:py-[1.75rem] text-white font-semibold">
        Image History 🎅🏻
      </h1>
      <div className="mx-[2rem]">
        {loading ? (
          <div className="animate-pulse ease-in-out">
            <h1 className="text-black">Loading...</h1>
          </div>
        ) : (
          <div>
            {" "}
            {user ? (
              <div>
                {images.length > 0 ? (
                  <div className="flex flex-wrap justify-between gap-0">
                    {[...images].reverse().map((image, index) => (
                      <div
                        key={index}
                        className="w-[50%] h-[50%] sm:w-[25%] sm:h-[25%] md:w-[33%] md:h-[33%] lg:w-[25%] lg:h-[25%] aspect-square relative p-2"
                        onClick={() => handleImageRoute(image.image)}
                      >
                        <div className="w-full h-full relative rounded-lg overflow-hidden group">
                          <Image
                            src={image.image}
                            alt="image"
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{ width: "100%", height: "auto" }}
                            className="group-hover:opacity-80"
                          />
                          {/* <Trash2
                            className="invisible absolute top-1 right-1 cursor-pointer text-red-500 group-hover:visible duration-200 ease-in-out transition-all"
                            onClick={() => handleDelete(image.image)}
                          /> */}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center mx-[2rem] leading-8 text-gray-400">
                    <h1 className="text-black">No images generated yet.</h1>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center mx-[2rem] leading-8 text-gray-300">
                <h1>
                  User not Signed In. Please Sign in to Save and View Image
                  History.
                </h1>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryImagesMobileSection;
