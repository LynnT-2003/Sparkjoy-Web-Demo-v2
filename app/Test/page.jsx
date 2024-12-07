"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const TestPage = () => {
  const router = useRouter();
  return (
    <div className="relative">
      <div className="absolute top-0 left-0">
        <div className="flex w-screen overflow-hidden items-center justify-center opacity-25 h-[32.5dvh] space-x-4">
          <img
            src="/exampleChristmas/1.png"
            className="h-full aspect-square rounded-lg"
          />
          <img
            src="/exampleChristmas/1.png"
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
            src="/exampleChristmas/1.png"
            className="h-full aspect-square rounded-lg"
          />
          <img
            src="/exampleChristmas/1.png"
            className="h-full aspect-square rounded-lg"
          />
        </div>
      </div>
      <div className="absolute w-full flex flex-col items-center justify-center h-[32.5dvh] ">
        <h1 className="font-sans font-extralight text-white  text-center uppercase bg-black px-4 mb-6 opacity-60">
          Unleash your creativity
        </h1>
        <h1 className="font-sans font-bold text-white text-3xl text-center">
          With our AI-Powered <br />
          Image Generator
        </h1>
      </div>

      <div className="mt-[67.5dvh] absolute w-full flex flex-col items-center justify-center h-[30dvh] px-16">
        <h1 className="font-sans font-bold text-white text-xl text-center mb-6">
          Save time and resources with <br />
          AI-powered technology
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
          <Image src="/brands/google.png" alt="Logo" width={40} height={40} />
          <h1 className="text-sm font-sans">Sign in With Google</h1>
        </div>
      </div>
    </div>
  );
};

export default TestPage;
