"use client";

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
      <div className="h-full w-full flex flex-col items-center sm:justify-center">
        <div className="pt-[4rem] sm:pt-0 w-[90%] sm:w-[50%] aspect-square">
          <img
            src={`https://res.cloudinary.com/prisma-forge/image/upload/${imageId}.png`}
            className="w-full aspect-square object-cover"
          />
        </div>
        <div className="w-full space-x-[5%] mt-8 flex items-center justify-center">
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
        </div>
      </div>
    </div>
  );
}
