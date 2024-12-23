"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
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
import Head from "next/head";

export default function HistoryDetailClient({ imageId }) {
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

  const handleDownload = () => {
    const imageUrl = `https://res.cloudinary.com/prisma-forge/image/upload/${imageId}.png`;

    // Fetch the image as a Blob
    fetch(imageUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch image for download");
        }
        return response.blob(); // Convert the response to a Blob
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob); // Create a URL for the Blob
        const link = document.createElement("a");
        link.href = url;
        link.download = `PrismaForge_${imageId}.png`; // Suggested file name
        document.body.appendChild(link); // Append the link to the document
        link.click(); // Trigger the download
        document.body.removeChild(link); // Remove the link
        window.URL.revokeObjectURL(url); // Revoke the Blob URL
      })
      .catch((error) => {
        console.error("Download failed:", error);
      });
  };

  return (
    <div className="h-[100dvh] sm:h-screen overflow-y-hidden">
      <div className="h-full w-full flex flex-col items-center mt-[1.15rem] md:mt-[1.75rem] lg:mt-0 lg:justify-center">
        <h1 className="text-white mb-2 font-sans text-lg sm:text-2xl font-extralight">
          Created by Prismaforge 🚀
        </h1>
        <h1 className="hidden sm:block text-white mb-4 font-sans text-lg sm:text-md font-extralight">
          Your image is ready to be downloaded.
        </h1>
        <div className="pt-[0rem] sm:pt-0 w-[90%] sm:w-[30rem] aspect-square">
          <img
            src={`https://res.cloudinary.com/prisma-forge/image/upload/${imageId}.png`}
            className="w-full aspect-square object-cover rounded-t-xl"
          />
        </div>
        <div className="w-[90%] sm:w-[30rem] space-x-[5%] mt-0 flex items-center justify-center bg-red-200 py-2 rounded-b-xl">
          <FacebookShareButton
            url={`https://prismaforge.vercel.app/history/${imageId}`}
            hashtag="#prismaforge"
          >
            <FacebookIcon size={32} round={true} />
          </FacebookShareButton>
          <LineShareButton
            url={`https://prismaforge.vercel.app/history/${imageId}`}
          >
            <LineIcon size={32} round={true} />
          </LineShareButton>
          <TwitterShareButton
            url={`https://prismaforge.vercel.app/history/${imageId}`}
            title="PrismaForge"
          >
            <TwitterIcon size={32} round={true} />
          </TwitterShareButton>
          <RedditShareButton
            url={`https://prismaforge.vercel.app/history/${imageId}`}
            title="PrismaForge"
          >
            <RedditIcon size={32} round={true} />
          </RedditShareButton>
        </div>
        <div className="flex items-center mt-4">
          <h1 className="text-white font-sans text-[0.5rem] sm:text-xs font-extralight">
            Support us by sharing our app with family and friends
          </h1>
          <CopyIcon
            className="ml-2 w-4 h-4 text-white hover:cursor-pointer"
            onClick={handleCopy}
          />
        </div>
        <Button className="mt-4" onClick={handleDownload}>
          Download now
        </Button>
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
