"use client";
import React from "react";
import Image from "next/image";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

interface ImageObject {
  images: string[]; // base64-encoded image string
  prompt: string;
}

interface HistoryImagesSectionProps {
  homeImages: ImageObject[]; // Array of image objects
}

const HistoryImagesSection: React.FC<HistoryImagesSectionProps> = ({
  homeImages,
}) => {
  console.log("Home Images", homeImages);

  return (
    <div className="px-24">
      <h2 className="text-xl font-bold mt-12 mb-6 pl-2">
        History of Generated Images
      </h2>

      {!homeImages ? (
        <div className="flex justify-center items-center h-20">
          {/* Add loading bar or spinner here */}
          <div className="w-24 h-2 bg-gray-300 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 animate-pulse"></div>
          </div>
          <p className="ml-4">Loading...</p>
        </div>
      ) : homeImages.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pb-24 gap-6">
          {homeImages
            .slice()
            .reverse()
            .map(({ images, prompt }, index) => (
              <CardContainer className="inter-var" key={index}>
                <CardBody className="relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full h-full rounded-xl p-6 px-2 border">
                  <CardItem translateZ="100" className="w-full mt-0">
                    <Image
                      src={`data:image/png;base64,${images[0]}`} // Use base64 string from image object
                      height={1000}
                      width={1000}
                      className="object-cover rounded-xl group-hover/card:shadow-xl"
                      alt={`Image with prompt: ${prompt}`}
                    />
                  </CardItem>
                  <CardItem translateZ="50" className="mt-4 text-white">
                    <p className="font-bold">Prompt: {prompt}</p>
                  </CardItem>
                </CardBody>
              </CardContainer>
            ))}
        </div>
      ) : (
        <p>No images generated yet!</p>
      )}
    </div>
  );
};

export default HistoryImagesSection;
