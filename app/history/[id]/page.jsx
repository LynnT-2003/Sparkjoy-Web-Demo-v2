import React from "react";
import HistoryDetailClient from "./HistoryDetailClient";

export const metadata = {
  title: "History Detail - Image",
  description: "View the details of this image in the history.",
  openGraph: {
    title: "History Detail - Image",
    description: "Explore the details of this image in the history.",
    images: [
      {
        url: "https://img.freepik.com/free-photo/anime-night-sky-illustration_23-2151684370.jpg",
        width: 800,
        height: 600,
        alt: "Image Detail",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "History Detail - Image",
    description: "Explore the details of this image in the history.",
    images: [
      "https://img.freepik.com/free-photo/anime-night-sky-illustration_23-2151684370.jpg",
    ],
  },
};

export default function HistoryImagePage({ params }) {
  const { id: imageId } = params;

  return (
    <div>
      <HistoryDetailClient imageId={imageId} />
    </div>
  );
}
