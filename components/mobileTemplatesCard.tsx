import React from "react";
import Image from "next/image";

interface MobileTemplatesCardProps {
  image: string;
  title: string;
  description: string;
}

const MobileTemplatesCard: React.FC<MobileTemplatesCardProps> = ({
  image,
  title,
  description,
}) => {
  return (
    <div className="relative mt-[-2rem] w-full z-10">
      <div className="mx-6 bg-[#202020] rounded-xl p-4">
        <div className="relative h-[12rem] w-full">
          <Image
            src={image}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="absolute inset-0"
          />
        </div>
        <h1 className="pt-4 font-sans font-bold text-md">{title}</h1>
        <h1 className="pt-2 font-sans text-sm">{description}</h1>
      </div>
    </div>
  );
};

export default MobileTemplatesCard;
