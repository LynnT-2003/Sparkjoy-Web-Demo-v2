"use client";

import React, { useState, useEffect } from "react";
import HeroSection from "@/components/sections/HeroSection";
import InputSection from "@/components/sections/InputSection";
import HistoryImagesSection from "@/components/sections/HistoryImagesSection";

export default function Home() {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchSavedImages = async () => {
      try {
        const response = await fetch("/api/savedImages", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch saved images");
        }

        const data = await response.json();
        const fetchedImages = data; // Assuming the API response includes an `images` field

        // Assuming the response contains base64-encoded images
        setImages(fetchedImages || []);
        setLoading(false); // Stop loading once images are fetched
        console.log("Fetched images:", fetchedImages);
      } catch (error) {
        console.error("Error fetching saved images:", error);
        setLoading(false); // Stop loading even if there's an error
      }
    };

    fetchSavedImages();
  }, []);

  return (
    <>
      {loading ? (
        <div>Loading</div>
      ) : (
        <div className="flex flex-col w-screen items-center justify-center">
          <HeroSection images={images} />
          <InputSection />
          <HistoryImagesSection />
        </div>
      )}
    </>
  );
}
