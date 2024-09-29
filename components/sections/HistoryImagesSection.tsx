"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

interface HistoryImagesSectionProps {
  homeImages: string[]; // Array of base64-encoded image strings
}

const HistoryImagesSection: React.FC<HistoryImagesSectionProps> = ({
  homeImages,
}) => {
  console.log("Home Images", homeImages);
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

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
            .slice(0, 6)
            .reverse()
            .map((image) => (
              <CardContainer className="inter-var" key={image}>
                <CardBody className="relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full h-full rounded-xl p-6 px-2 border  ">
                  {/* <CardItem
                  translateZ="50"
                  className="text-xl font-bold text-white dark:text-white"
                >
                  Make things float in air
                </CardItem>
                <CardItem
                  as="p"
                  translateZ="60"
                  className="text-white text-sm max-w-sm mt-2 dark:text-neutral-300"
                >
                  Hover over this card to unleash the power of CSS perspective
                </CardItem> */}
                  <CardItem translateZ="100" className="w-full mt-0">
                    <Image
                      src={`data:image/png;base64,${image}`} // Use base64 string
                      height={1000}
                      width={1000}
                      className="object-cover rounded-xl group-hover/card:shadow-xl"
                      alt="thumbnail"
                    />
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
