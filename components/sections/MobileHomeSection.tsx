import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { Sparkles } from "lucide-react";

const MobileHomeSection = () => {
  return (
    // <div className="h-screen pl-16 pt-[1.8rem]">
    <div className="h-screen w-screen relative flex flex-col items-center justify-center">
      <div className="absolute inset-0">
        <Image
          src="/bg/bg.jpg"
          alt="Logo"
          layout="fill"
          objectFit="cover"
          className="opacity-20"
        />
      </div>
      <h1 className="relative z-10 text-white text-7xl mx-12 font-bold">
        Start Creating Your Art Now
      </h1>
      <div className="flex flex-col space-y-4 w-full px-12 z-10 mt-48">
        <Button className="w-full font-sans text-md">Get Started</Button>
        <div
          className="flex items-center justify-center py-1 space-x-2"
          style={{ backgroundColor: "rgba(30, 30, 30, 0.8)" }}
        >
          {" "}
          <Image src="/brands/google.png" alt="Logo" width={40} height={40} />
          <h1 className="text-sm font-sans">Sign in With Google</h1>
        </div>
      </div>
    </div>
  );
};
export default MobileHomeSection;
