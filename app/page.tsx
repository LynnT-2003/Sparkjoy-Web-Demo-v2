"use client";

import React, { useState, useEffect } from "react";
import { onAuthStateChange } from "@/lib/firebase";
import { User } from "firebase/auth";
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
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      if (user) {
        setUser(user);
        console.log("User is now: ", user);
      } else {
        setUser(null);
        setImages([]); // Clear images when user signs out
        setLoading(false); // Stop loading if there's no user
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchSavedImages = async () => {
      console.log("Fetching..?");
      if (!user) return; // Only fetch images if the user is logged in

      try {
        console.log("Fetching from API for user:", user?.uid);
        const response = await fetch(`/api/savedImages?userId=${user?.uid}`, {
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
        setLoading(false);
        console.log("Fetched images:", data);
      } catch (error) {
        console.error("Error fetching saved images:", error);
        setLoading(false); // Stop loading even if there's an error
      }
    };

    fetchSavedImages();
  }, [user]); // Fetch images when the user changes

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
