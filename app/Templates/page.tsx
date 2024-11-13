"use client";
import React from "react";
import { TemplateCard } from "@/components/template-card";

const TemplatesPage = () => {
  const templates = [
    {
      title: "Animate your look",
      thumbnail: "/templates/cartoon.png",
      subtitle:
        "Turn any selfie into a fun and unique cartoon. Experiment with bold outlines, vibrant colors, and stylized effects to create your animated alter-ego.",
    },
    {
      title: "Christmas Theme",
      thumbnail: "/templates/christmas.png",
      subtitle:
        "Add a festive touch to your photos with Christmas designs. Choose from holiday lights, snow effects, and custom frames to make your images merry and bright.",
    },
    {
      title: "Test your Fortune",
      thumbnail: "/templates/fortune.jpg",
      subtitle:
        "Get fun, personalized fortune readings in seconds. Upload your photo to reveal mystical insights with colorful illustrations and cosmic designs.",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="my-6 text-5xl text-center font-bold font-sans relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 pb-4">
        Generative AI Templates
      </h1>
      <div className="flex flex-wrap justify-center gap-4 w-full px-4">
        {templates.map((template, index) => (
          <div key={index}>
            {/* Each card takes up 50% width */}
            <TemplateCard
              title={template.title}
              thumbnail={template.thumbnail}
              subtitle={template.subtitle}
            />
          </div>
        ))}
        <div className="flex flex-col items-center justify-center m-2 w-[700px] h-[270px] rounded-lg text-white/[0.5] font-sans text-4xl">
          <h1>More Coming Soon.</h1>
          <h1 className="text-[1.5rem] mt-2">Stay tuned..</h1>
        </div>
      </div>
    </div>
  );
};

export default TemplatesPage;
