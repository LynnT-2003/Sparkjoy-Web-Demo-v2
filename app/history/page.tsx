"use client";
import React from "react";
import { useState, useEffect } from "react";
import { onAuthStateChange } from "@/lib/firebase";
import { User } from "firebase/auth";
import HistoryImagesSection from "@/components/sections/HistoryImagesSection";
import HistoryImagesMobileSection from "@/components/sections/HistoryImagesMobileSection";

interface ImageObject {
  _id: string;
  image: string; // Base64-encoded image string
  prompt: string; // Image generation prompt
}

const HistoryPage = () => {
  const [images, setImages] = useState<ImageObject[]>([]);
  const [user, setUser] = useState<User | null>(null);
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
        setImages([]); // Clear images when user signs out
        setLoading(false); // Stop loading if there's no user
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      {/* <div className="hidden lg:block">
        <HistoryImagesSection homeImages={images} />
      </div> */}
      <div className="">
        <HistoryImagesMobileSection />
      </div>
    </div>
  );
};

export default HistoryPage;
