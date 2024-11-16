"use client";

import React, { useState, useEffect } from "react";

// Navigation Test
import MobileSidebar from "@/components/mui-mobile-drawer";
import { MobileSidebarItem } from "@/components/mui-mobile-drawer";

import { onAuthStateChange } from "@/lib/firebase";
import { User } from "firebase/auth";
import { motion, AnimatePresence } from "framer-motion";
import LoadingSection from "@/components/sections/LoadingSection";
import HeroSection from "@/components/sections/HeroSection";
import InputSection from "@/components/sections/InputSection";
import HistoryImagesSection from "@/components/sections/HistoryImagesSection";
import { Edit, Settings, LogOut, HomeIcon, Image } from "lucide-react";

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
        fetchSavedImages(user.uid); // Fetch images when the user logs in
      } else {
        setUser(null);
        setImages([]); // Clear images when user signs out
        setLoading(false); // Stop loading if there's no user
      }
    });
    return () => unsubscribe();
  }, []);

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

  const handleNewImage = () => {
    if (user?.uid) {
      fetchSavedImages(user.uid); // Fetch images again after a new image is added
    } else {
      console.error("User not authenticated");
    }
  };

  return (
    <div className="relative overflow-x-hidden">
      <div className="hidden md:block">
        <div className=" absolute top-0 left-0">
          <HeroSection images={images} />
        </div>
        <div className="pt-[2640px]">
          <InputSection onNewImage={handleNewImage} />
        </div>
      </div>
      <div className="md:hidden flex bg-[#191919]">
        <div className="w-full overflow-x-hidden">
          <div className="h-screen">
            <h1 className="text-start pl-16 pt-[1.8rem] font-bold">
              Welcome to Mobile Responsiveness
            </h1>
            <h1 className="text-start pl-16 pt-[1.8rem]">
              So far this is just a demo with a
            </h1>
            <h1 className="text-start pl-16">
              sidebar initialized. Try it out &#33;
            </h1>
            <h1 className="text-start pl-16 pt-[1.8rem]">
              1. Click on our brand new
            </h1>
            <h1 className="text-start pl-[5.25rem]">mobile sidebar.</h1>
            <h1 className="text-start pl-16 pt-[1.8rem]">2. Scroll me &#33;</h1>
          </div>

          <div className="w-full flex flex-col justify-center items-center h-[100vh]">
            <h1 className="flex flex-col items-center text-center w-[85vw] justify-center leading-loose">
              Rotate me on if you are on a Mobile device. See what changed and
              why. This is what we call a mobile responsive UI. Our goal, later
              on, should be to make our web application user-friendly &
              accessible across all media devices. This is why a well
              thought-out and finalized initial low-mid fidelity design is
              important for any web application project that demands mobile UI
              responsiveness, so that keep we can keep our codebase and project
              management clean, maintainable, and scalable
            </h1>
            <h1 className="flex flex-col mt-24 items-center text-center w-[85vw] justify-center leading-loose">
              Note: The code I have written right now for is not in its best
              form or architecture lol. This is just a demo as a concept, since
              the design is in progress.
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
