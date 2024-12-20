"use client";

import React, { useState } from "react";
import { CopyIcon } from "lucide-react";
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
import { Snackbar, Alert } from "@mui/material";

export default function HistoryImagePage({ params }) {
  const { id: imageId } = params;
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    const currentURL = window.location.href;
    navigator.clipboard.writeText(currentURL);
    setIsCopied(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setIsCopied(false);
  };

  const currentURL = window.location.href;

  return (
    <div className="h-[100dvh] sm:h-screen bg-blue-50 overflow-y-hidden">
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
          <FacebookShareButton url={currentURL} hashtag="#prismaforge">
            <FacebookIcon size={32} round={true} />
          </FacebookShareButton>
          <LineShareButton url={currentURL}>
            <LineIcon size={32} round={true} />
          </LineShareButton>
          <TwitterShareButton url={currentURL} title="PrismaForge">
            <TwitterIcon size={32} round={true} />
          </TwitterShareButton>
          <RedditShareButton url={currentURL} title="PrismaForge">
            <RedditIcon size={32} round={true} />
          </RedditShareButton>
        </div>
        <div className="flex items-center mt-4">
          <h1 className="text-black font-sans text-[0.5rem] sm:text-xs font-extralight">
            Support us by sharing our app with family and friends
          </h1>
          <CopyIcon
            className="ml-2 w-4 h-4 text-black hover:cursor-pointer"
            onClick={handleCopy}
          />
        </div>
        <Snackbar
          open={isCopied}
          autoHideDuration={2000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          sx={{ position: "absolute", bottom: 0 }}
          className="hidden sm:block"
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Link copied to clipboard!
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}
