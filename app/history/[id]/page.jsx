"use client";

import { ClipboardCopyIcon, Copy, CopyIcon } from "lucide-react";
import {
  FacebookShareButton,
  FacebookIcon,
  LineShareButton,
  LineIcon,
  TwitterShareButton,
  TwitterIcon,
  RedditShareButton,
  RedditIcon,
} from "react-share";

export default function HistoryImagePage({ params }) {
  const { id: imageId } = params;
  console.log("Image ID:", imageId);

  return (
    <div className="h-screen bg-blue-50">
      <div className="h-full w-full flex flex-col items-center mt-[1.15rem] md:mt-[1.75rem] lg:mt-0 lg:justify-center">
        <h1 className="text-black mb-4 font-sans text-lg sm:text-2xl font-extralight">
          Created by Prismaforge 🚀
        </h1>
        <div className="pt-[0rem] sm:pt-0 w-[90%] sm:w-[30rem] aspect-square">
          <img
            src={`https://res.cloudinary.com/prisma-forge/image/upload/${imageId}.png`}
            className="w-full aspect-square object-cover"
          />
        </div>
        <div className="w-[90%] sm:w-[30rem] space-x-[5%] mt-2 flex items-center justify-center bg-blue-300 py-2 rounded-b-xl">
          <FacebookShareButton
            url="https://prismaforge.vercel.app/"
            hashtag="#prismaforge"
          >
            <FacebookIcon size={32} round={true} />
          </FacebookShareButton>
          <LineShareButton url="https://prismaforge.vercel.app/">
            <LineIcon size={32} round={true} />
          </LineShareButton>
          <TwitterShareButton
            url="https://prismaforge.vercel.app/"
            title="PrismaForge"
          >
            <TwitterIcon size={32} round={true} />
          </TwitterShareButton>
          <RedditShareButton
            url="https://prismaforge.vercel.app/"
            title="PrismaForge"
          >
            <RedditIcon size={32} round={true} />
          </RedditShareButton>
        </div>{" "}
        <div className="flex items-center mt-4">
          <h1 className="text-black font-sans text-[0.5rem] sm:text-xs font-extralight">
            Support us by sharing our app with family and friends
          </h1>
          <CopyIcon className="ml-2 w-4 h-4 text-black hover:cursor-pointer" />
        </div>
      </div>
    </div>
  );
}
