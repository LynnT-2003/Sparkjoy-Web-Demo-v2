import React from "react";
import Image from "next/image";
import MobileTemplatesCard from "@/components/mobileTemplatesCard";

import { useGSAP } from "@gsap/react";
import { animateWithGsapBottom } from "@/lib/animation";

const templates = [
  {
    image: "/bg/bg.jpg",
    title: "Animate your look",
    description:
      "Turn any selfie or portrait into a fun and unique cartoon style. Experiment with bold outlines, vibrant colors, and stylized effects to create your own animated image.",
  },
  {
    image: "/templates/christmas.jpg",
    title: "Christmas Theme",
    description:
      "Add a festive touch to your photos with Christmas designs. Choose from holiday lights, snow effects, and custom frames to make your images merry and bright.",
  },
  {
    image: "/templates/fortune.jpg",
    title: "Test Your Fortune",
    description:
      "Get fun, personalized fortune readings in seconds. Upload your photo to reveal mystical insights with colorful illustrations and cosmic designs.",
  },
];

const MobileImageUploadSection = () => {
  useGSAP(() => {
    animateWithGsapBottom("#header", {
      y: 0,
      opacity: 1,
      duration: 0.3,
    });
  }, []);
  useGSAP(() => {
    animateWithGsapBottom("#templates", {
      y: 0,
      opacity: 1,
      duration: 0.6,
    });
  }, []);

  return (
    <div className="">
      <div
        className="h-48 relative flex items-center justify-center z-0"
        id="header"
      >
        <div className="absolute inset-0">
          <Image
            src="/bg/bg.jpg"
            alt="Logo"
            layout="fill"
            objectFit="cover"
            className="opacity-20"
          />
        </div>
        <h1 className="z-10 mb-[2rem] text-center text-white text-4xl mx-12 font-bold overflow-hidden">
          Generative AI Templates
        </h1>
      </div>
      <div className="flex flex-col space-y-6 w-full mb-12" id="templates">
        {templates.map((template, index) => (
          <MobileTemplatesCard
            key={index}
            image={template.image}
            title={template.title}
            description={template.description}
          />
        ))}
      </div>
    </div>
  );
};

export default MobileImageUploadSection;
