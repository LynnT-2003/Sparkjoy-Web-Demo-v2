"use client";
import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";

import { useRouter } from "next/navigation";

const MobileHomeSection = () => {
  const router = useRouter();

  return (
    // <div className="h-screen w-screen relative flex flex-col items-center justify-center">
    //   <div className="absolute inset-0">
    //     <Image
    //       src="/bg/bg.jpg"
    //       alt="Logo"
    //       layout="fill"
    //       objectFit="cover"
    //       className="opacity-20"
    //     />
    //   </div>
    //   <h1 className="relative z-10 text-white text-7xl mx-12 font-bold">
    //     Start Creating Your Art Now
    //   </h1>
    //   <div className="flex flex-col space-y-4 w-full px-12 z-10 mt-48">
    //     <Button
    //       className="w-full font-sans text-md"
    //       onClick={() => router.push("/ImageUpload")}
    //     >
    //       Get Started
    //     </Button>
    //     <div
    //       className="flex items-center justify-center py-1 space-x-2"
    //       style={{ backgroundColor: "rgba(30, 30, 30, 0.8)" }}
    //     >
    //       {" "}
    //       <Image src="/brands/google.png" alt="Logo" width={40} height={40} />
    //       <h1 className="text-sm font-sans">Sign in With Google</h1>
    //     </div>
    //   </div>
    // </div>
    <div className="relative">
      <div className="absolute top-0 left-0">
        <div className="flex w-screen overflow-hidden items-center justify-center opacity-25 h-[32.5dvh] space-x-4">
          <img
            id="image1"
            src="/exampleChristmas/3.png"
            className="h-full aspect-square rounded-lg motion-preset-blur-right motion-duration-700"
          />
          <img
            id="image2"
            src="/exampleChristmas/2.png"
            className="h-full aspect-square rounded-lg motion-preset-blur-right motion-duration-1000"
          />
        </div>
        <div className="flex w-screen h-[35dvh] ">
          <div className="h-full flex overflow-hidden items-center justify-center space-x-4 py-4">
            <img
              src="/exampleChristmas/1.png"
              className="h-full aspect-square rounded-lg motion-preset-blur-right motion-duration-700"
            />
            <img
              src="/exampleChristmas/1.png"
              className="h-full aspect-square rounded-lg motion-preset-blur-right motion-duration-700"
            />
            <img
              src="/exampleChristmas/1.png"
              className="h-full aspect-square rounded-lg motion-preset-blur-right motion-duration-1000"
            />
          </div>
        </div>
        <div className="flex w-screen overflow-hidden items-center justify-center opacity-25 h-[32.5dvh] space-x-4">
          <img
            id="image3"
            src="/exampleChristmas/2.png"
            className="h-full aspect-square rounded-lg motion-preset-blur-right motion-duration-700"
          />
          <img
            id="image4"
            src="/exampleChristmas/3.png"
            className="h-full aspect-square rounded-lg motion-preset-blur-right motion-duration-1000"
          />
        </div>
      </div>
      <div className="absolute w-full flex flex-col items-center justify-center h-[32.5dvh] motion-preset-slide-right motion-duration-1000">
        <h1 className="py-2 font-sans font-extralight text-white  text-center uppercase bg-black px-4 mb-6 opacity-60">
          Unleash your creativity
        </h1>
        <h1 className="font-sans font-bold text-white text-3xl text-center">
          Redefine yourself with
          <br />
          Baksters Christmas
        </h1>
      </div>

      <div className="mt-[67.5dvh] absolute w-full flex flex-col items-center justify-center h-[30dvh] px-16 motion-preset-slide-right motion-duration-1000">
        <h1 className="font-sans font-semibold text-white text-xl text-center mb-6">
          Introducing new
          <br />
          versions of yourself !
        </h1>

        <Button
          className="w-full font-sans text-sm mb-3"
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
export default MobileHomeSection;
