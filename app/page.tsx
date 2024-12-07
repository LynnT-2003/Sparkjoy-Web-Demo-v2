"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

// Navigation Test
import MobileSidebar from "@/components/mui-mobile-drawer";
import { MobileSidebarItem } from "@/components/mui-mobile-drawer";

import { onAuthStateChange } from "@/lib/firebase";
import { User } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import LoadingSection from "@/components/sections/LoadingSection";
import HeroSection from "@/components/sections/HeroSection";
import InputSection from "@/components/sections/InputSection";
import HistoryImagesSection from "@/components/sections/HistoryImagesSection";
import { Edit, Settings, LogOut, HomeIcon } from "lucide-react";
import MobileHomeSection from "@/components/sections/MobileHomeSection";
import { useRouter } from "next/navigation";

interface ImageObject {
  _id: string;
  image: string; // Base64-encoded image string
  prompt: string; // Image generation prompt
}

export default function Home() {
  const router = useRouter();

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
      <div className="md:hidden flex bg-[#191919] h-[100dvh]">
        <div className="w-full overflow-x-hidden">
          {/* <MobileHomeSection /> */}
          <div className="relative">
            <div className="absolute top-0 left-0">
              <div className="flex w-screen overflow-hidden items-center justify-center opacity-25 h-[32.5dvh] space-x-4">
                <img
                  src="/exampleChristmas/3.png"
                  className="h-full aspect-square rounded-lg"
                />
                <img
                  src="/exampleChristmas/2.png"
                  className="h-full aspect-square rounded-lg"
                />
              </div>
              <div className="flex w-screen h-[35dvh] ">
                <div className="h-full flex overflow-hidden items-center justify-center space-x-4 py-4">
                  <img
                    src="/exampleChristmas/1.png"
                    className="h-full aspect-square rounded-lg"
                  />
                  <img
                    src="/exampleChristmas/1.png"
                    className="h-full aspect-square rounded-lg"
                  />
                  <img
                    src="/exampleChristmas/1.png"
                    className="h-full aspect-square rounded-lg"
                  />
                </div>
              </div>
              <div className="flex w-screen overflow-hidden items-center justify-center opacity-25 h-[32.5dvh] space-x-4">
                <img
                  src="/exampleChristmas/2.png"
                  className="h-full aspect-square rounded-lg"
                />
                <img
                  src="/exampleChristmas/3.png"
                  className="h-full aspect-square rounded-lg"
                />
              </div>
            </div>
            <div className="absolute w-full flex flex-col items-center justify-center h-[32.5dvh] ">
              <h1 className="font-sans font-extralight text-white  text-center uppercase bg-black px-4 mb-6 opacity-60">
                Unleash your creativity
              </h1>
              <h1 className="font-sans font-bold text-white text-3xl text-center">
                Redefine yourself with
                <br />
                Baksters Christmas
              </h1>
            </div>

            <div className="mt-[67.5dvh] absolute w-full flex flex-col items-center justify-center h-[30dvh] px-16">
              <h1 className="font-sans font-semibold text-white text-xl text-center mb-6">
                Start introducing <br />
                new versions of yourself
              </h1>

              <Button
                className="w-full font-sans text-md mb-3"
                onClick={() => router.push("/ImageUpload")}
              >
                Get Started
              </Button>
              <div
                className="w-full flex items-center justify-center py-1 space-x-2"
                style={{ backgroundColor: "rgba(30, 30, 30, 0.8)" }}
              >
                {" "}
                <Image
                  src="/brands/google.png"
                  alt="Logo"
                  width={40}
                  height={40}
                />
                <h1 className="text-sm font-sans">Sign in With Google</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
