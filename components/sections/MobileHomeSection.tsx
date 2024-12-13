// "use client";
// import React, { useState, useEffect } from "react";
// import Image from "next/image";
// import { Button } from "../ui/button";
// import { useRouter } from "next/navigation";

// const MobileHomeSection = () => {
//   const router = useRouter();
//   const [getStartedClicked, setGetStartedClicked] = useState(false);

//   const handleGetStartedClick = () => {
//     setGetStartedClicked(true);
//   };

//   return (
//     // <div className="h-screen w-screen relative flex flex-col items-center justify-center">
//     //   <div className="absolute inset-0">
//     //     <Image
//     //       src="/bg/bg.jpg"
//     //       alt="Logo"
//     //       layout="fill"
//     //       objectFit="cover"
//     //       className="opacity-20"
//     //     />
//     //   </div>
//     //   <h1 className="relative z-10 text-white text-7xl mx-12 font-bold">
//     //     Start Creating Your Art Now
//     //   </h1>
//     //   <div className="flex flex-col space-y-4 w-full px-12 z-10 mt-48">
//     //     <Button
//     //       className="w-full font-sans text-md"
//     //       onClick={() => router.push("/ImageUpload")}
//     //     >
//     //       Get Started
//     //     </Button>
//     //     <div
//     //       className="flex items-center justify-center py-1 space-x-2"
//     //       style={{ backgroundColor: "rgba(30, 30, 30, 0.8)" }}
//     //     >
//     //       {" "}
//     //       <Image src="/brands/google.png" alt="Logo" width={40} height={40} />
//     //       <h1 className="text-sm font-sans">Sign in With Google</h1>
//     //     </div>
//     //   </div>
//     // </div>
//     <div
//       className="relative"
//       onClick={() => getStartedClicked && setGetStartedClicked(false)} // Only set to false if true
//     >
//       <div
//         className={`absolute top-0 left-0 ${
//           getStartedClicked ? "opacity-15" : "opacity-100"
//         }`}
//       >
//         <div className="flex w-screen overflow-hidden items-center justify-center opacity-25 h-[32.5dvh] space-x-4">
//           <img
//             id="image1"
//             src="/exampleChristmas/3.png"
//             className="h-full aspect-square rounded-lg motion-preset-blur-right motion-duration-700"
//           />
//           <img
//             id="image2"
//             src="/exampleChristmas/2.png"
//             className="h-full aspect-square rounded-lg motion-preset-blur-right motion-duration-1000"
//           />
//         </div>
//         <div className="flex w-screen h-[35dvh] ">
//           <div className="h-full flex overflow-hidden items-center justify-center space-x-4 py-4">
//             <img
//               src="/exampleChristmas/1.png"
//               className="h-full aspect-square rounded-lg motion-preset-blur-right motion-duration-700"
//             />
//             <img
//               src="/exampleChristmas/1.png"
//               className="h-full aspect-square rounded-lg motion-preset-blur-right motion-duration-700"
//             />
//             <img
//               src="/exampleChristmas/1.png"
//               className="h-full aspect-square rounded-lg motion-preset-blur-right motion-duration-1000"
//             />
//           </div>
//         </div>
//         <div className="flex w-screen overflow-hidden items-center justify-center opacity-25 h-[32.5dvh] space-x-4">
//           <img
//             id="image3"
//             src="/exampleChristmas/2.png"
//             className="h-full aspect-square rounded-lg motion-preset-blur-right motion-duration-700"
//           />
//           <img
//             id="image4"
//             src="/exampleChristmas/3.png"
//             className="h-full aspect-square rounded-lg motion-preset-blur-right motion-duration-1000"
//           />
//         </div>
//       </div>

//       <div
//         className={`absolute w-full flex flex-col items-center justify-center h-[32.5dvh] motion-preset-slide-right motion-duration-1000 ${
//           getStartedClicked ? "invisible" : "visible"
//         }`}
//       >
//         <h1 className="py-2 font-sans font-extralight text-white  text-center uppercase bg-black px-4 mb-6 opacity-60">
//           Unleash your creativity
//         </h1>
//         <h1 className="font-sans font-bold text-white text-3xl text-center">
//           Redefine yourself with
//           <br />
//           Baksters Christmas
//         </h1>
//       </div>

//       <div
//         className={`mt-[67.5dvh] absolute w-full flex flex-col items-center justify-center h-[30dvh] px-16 motion-preset-slide-right motion-duration-1000 ${
//           getStartedClicked ? "invisible" : "visible"
//         }`}
//       >
//         <h1 className="font-sans font-semibold text-white text-xl text-center mb-6">
//           Introducing new
//           <br />
//           versions of yourself !
//         </h1>

//         <Button
//           className="w-full font-sans text-sm mb-3"
//           onClick={handleGetStartedClick}
//         >
//           Get Started
//         </Button>
//         <div
//           className="w-full flex items-center justify-center py-1 space-x-2"
//           style={{ backgroundColor: "rgba(30, 30, 30, 0.8)" }}
//         >
//           {" "}
//           <Image src="/brands/google.png" alt="Logo" width={40} height={40} />
//           <h1 className="text-sm font-sans">Sign in With Google</h1>
//         </div>
//       </div>

//       <div
//         className={`${
//           getStartedClicked ? "block" : "hidden"
//         } absolute flex items-center justify-center h-[100dvh]`}
//       >
//         <div className="flex flex-wrap items-center justify-center gap-[2.5vw]">
//           <div className="w-[45vw] motion-preset-slide-right motion-duration-1500 motion-delay-0">
//             <img
//               className="w-[45vw] h-[45vw] object-cover"
//               src="/exampleChristmas/original.png"
//             />
//             <h1 className="mt-2 text-center">
//               Step 1: Take a photo or upload from your device.
//             </h1>
//           </div>
//           <div className="w-[45vw] motion-preset-slide-right motion-duration-1500 motion-delay-[1000ms]">
//             <img
//               className="w-[45vw] h-[45vw] object-cover"
//               src="/exampleChristmas/loading.avif"
//             />
//             <h1 className="mt-2 text-center">
//               Step 2: Wait for the magic to happen
//             </h1>
//           </div>
//           <div className="w-[45vw] motion-preset-slide-right motion-duration-1500 motion-delay-[2000ms]">
//             <img
//               className="w-[45vw] h-[45vw]"
//               src="/exampleChristmas/transformed.png"
//             />
//             <h1 className="mt-2 text-center">
//               Step 3: Collect & Save your new look. Share it with your friends
//             </h1>
//           </div>
//           <div className="w-[45vw] motion-preset-slide-right motion-duration-1500 motion-delay-[3000ms]">
//             <img
//               className="w-[45vw] h-[45vw] object-cover bg-slate-500 opacity-80"
//               src="/exampleChristmas/1.png"
//             />
//             <h1 className="mt-2 text-center">
//               Step 4: Keep collecting for a chance to win different variations
//             </h1>
//           </div>
//           <Button
//             className="z-99 mt-12 p-[1.5rem] motion-preset-fade motion-duration-1500 motion-delay-[4000ms]"
//             onClick={() => router.push("/ImageUpload")}
//           >
//             Start Collecting
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default MobileHomeSection;

"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const MobileHomeSection = () => {
  const router = useRouter();
  const [getStartedClicked, setGetStartedClicked] = useState(false);
  const [stepVisible, setStepVisible] = useState(false);

  const handleGetStartedClick = () => {
    setGetStartedClicked(true);
  };

  const handleOutsideAreaClick = () => {
    setGetStartedClicked(false);
  };

  const handleStartCollecting = () => {
    // Navigate or perform an action when the button is clicked
    router.push("/Test");
  };

  return (
    <div className="w-full">
      {/* Background Content */}
      <div
        className={`w-full h-screen flex flex-col items-center absolute top-0 left-0 ${
          getStartedClicked ? "opacity-15" : "opacity-100"
        }`}
      >
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
        <div className="flex w-full items-center justify-center h-[35dvh] ">
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
          />{" "}
          <img
            id="image3"
            src="/exampleChristmas/2.png"
            className="h-full aspect-square rounded-lg motion-preset-blur-right motion-duration-700"
          />
          <img
            id="image4"
            src="/exampleChristmas/3.png"
            className="h-full aspect-square rounded-lg motion-preset-blur-right motion-duration-1000"
          />{" "}
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

      {/* Initial Get Started Section */}
      <div
        className={`absolute w-full flex flex-col items-center justify-center h-[32.5dvh] motion-preset-slide-right motion-duration-1000 ${
          getStartedClicked ? "invisible" : "visible"
        }`}
      >
        <h1 className="py-2 font-sans font-extralight text-white text-center uppercase bg-black px-4 mb-6 opacity-60">
          Unleash your creativity
        </h1>
        <h1 className="font-sans font-bold text-white text-3xl text-center">
          Redefine yourself with
          <br />
          Baksters Christmas
        </h1>
      </div>

      {/* Step 2: Wait for the magic */}
      <div className="w-full flex items-center justify-center mt-[67.5dvh] absolute">
        {" "}
        <div
          className={`w-full md:w-1/3 flex flex-col items-center justify-center h-[30dvh] px-16 motion-preset-slide-right motion-duration-1000 ${
            getStartedClicked ? "invisible" : "visible"
          }`}
        >
          <h1 className="font-sans font-semibold text-white text-xl text-center mb-6">
            Introducing new
            <br />
            versions of yourself !
          </h1>

          <Button
            className="w-full font-sans text-sm mb-3"
            onClick={handleGetStartedClick}
          >
            Get Started
          </Button>
          <div
            className="w-full flex items-center justify-center py-1 space-x-2"
            style={{ backgroundColor: "rgba(30, 30, 30, 0.8)" }}
          >
            <Image src="/brands/google.png" alt="Logo" width={40} height={40} />
            <h1 className="text-sm font-sans">Sign in With Google</h1>
          </div>
        </div>
      </div>

      {/* Tutorial Steps */}
      <div
        className={`${
          getStartedClicked ? "block" : "hidden"
        } absolute flex items-center justify-center h-[100dvh]`}
        onClick={handleOutsideAreaClick}
      >
        <div className="flex flex-wrap items-center justify-center gap-[2.5vw] gap-y-8 z-99">
          <div className="w-[45vw] motion-preset-slide-right motion-duration-1500 motion-delay-0">
            <div className="w-[45vw] aspect-square relative">
              <Image
                alt="image"
                className="object-cover"
                layout="fill"
                src="/exampleChristmas/original.png"
              />
            </div>
            <h1 className="mt-2 text-center">
              Step 1: Take a photo or upload an image
            </h1>
          </div>
          <div className="w-[45vw] motion-preset-slide-right motion-duration-1500 motion-delay-[1000ms]">
            <div className="w-[45vw] aspect-square relative">
              <Image
                alt="image"
                className="object-cover"
                layout="fill"
                src="/exampleChristmas/loading.avif"
              />
            </div>
            <h1 className="mt-2 text-center">
              Step 2: Wait for the magic to happen
            </h1>
          </div>
          <div className="w-[45vw] motion-preset-slide-right motion-duration-1500 motion-delay-[2000ms]">
            <div className="w-[45vw] aspect-square relative">
              <Image
                alt="image"
                className="object-cover"
                layout="fill"
                src="/exampleChristmas/transformed.png"
              />
            </div>
            <h1 className="mt-2 text-center">
              Step 3: Collect & Save your new look
            </h1>
          </div>
          <div className="w-[45vw] motion-preset-slide-right motion-duration-1500 motion-delay-[3000ms]">
            <div className="w-[45vw] aspect-square relative">
              <Image
                alt="image"
                className="object-cover"
                layout="fill"
                src="/exampleChristmas/1.png"
              />
            </div>
            <h1 className="mt-2 text-center">
              Step 4: Keep collecting to win new variations
            </h1>
          </div>
          <div onClick={(e) => e.stopPropagation()}>
            <Button
              className="mt-4 p-[1.5rem] motion-preset-fade motion-duration-2000 motion-delay-[4500ms]"
              onClick={handleStartCollecting}
            >
              Start Collecting
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileHomeSection;
