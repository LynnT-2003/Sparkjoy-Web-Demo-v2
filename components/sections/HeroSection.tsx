"use client";
import React from "react";
import { HeroParallax } from "../ui/hero-parallax";

interface ImageObject {
  images: string[];
  info: string;
  prompt: string;
}

interface InputSectionProps {
  images: ImageObject[]; // Array of image objects
}

const HeroSection: React.FC<InputSectionProps> = ({ images }) => {
  // Transform string[] into { thumbnail: string }[] and prepend the base64 data URL
  const transformedImages = images.map(({ images }) => ({
    thumbnail: `data:image/png;base64,${images[0]}`, // Assuming PNG format for the base64 images
  }));

  return <HeroParallax products={transformedImages} />;
};

export default HeroSection;
