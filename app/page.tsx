"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoadingSection from "@/components/sections/LoadingSection";
import HeroSection from "@/components/sections/HeroSection";
import InputSection from "@/components/sections/InputSection";
import HistoryImagesSection from "@/components/sections/HistoryImagesSection";

interface ImageObject {
  _id: string;
  image: string; // Base64-encoded image string
  prompt: string; // Image generation prompt
}

export default function Home() {
  const [images, setImages] = useState<ImageObject[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSavedImages = async () => {
      try {
        console.log("Fetching from API because there is no localstorage cache");
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
        setImages(data || []); // Now expecting array of image objects
        setLoading(false);
        console.log("Fetched images:", data);
      } catch (error) {
        console.error("Error fetching saved images:", error);
        setLoading(false); // Stop loading even if there's an error
      }
    };

    fetchSavedImages();
  }, []);

  return (
    <div className="w-screen">
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            className="h-screen flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <LoadingSection />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            className="flex flex-col w-screen items-center justify-center "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <HeroSection images={images} />
            <div className="flex flex-col w-full w-screen items-center justify-center bg-grid-gray-900 bg-black">
              <InputSection />
              <HistoryImagesSection homeImages={images} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
