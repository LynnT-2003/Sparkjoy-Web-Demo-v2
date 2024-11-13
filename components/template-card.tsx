import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

// Define the props the component expects
interface TemplateCardProps {
  title: string;
  thumbnail: string;
  subtitle: string;
}

export function TemplateCard({
  title,
  thumbnail,
  subtitle,
}: TemplateCardProps) {
  return (
    <div className="m-2 bg-[#181818] w-[700px] h-[270px] rounded-lg border-white/[0.1] border">
      <div className="px-5 flex space-x-7 h-full mr-4">
        <div className="w-3/5 my-5 flex items-center aspect-square relative">
          <Image
            src={thumbnail} // Using the dynamic thumbnail prop
            alt={title} // Using the title for the alt text
            className="rounded-2xl object-cover"
            fill
            sizes="100vw"
          />
        </div>

        <div className="py-5 my-1 flex flex-col h-full justify-between">
          <div className="h-full">
            <h1 className="font-bold font-sans text-xl mb-6">{title}</h1>
            <h1 className="font-sans text-md text-justify">{subtitle}</h1>
          </div>
          <Button className="w-full self-start mt-auto ml-auto mb-1 bg-white text-black font-sans text-md hover:bg-gradient-to-r hover:from-purple-900 hover:to-pink-900 hover:text-white hover:font-bold transition-all duration-300 ease-linear">
            Try it out <ArrowRight className="w-4 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
