import React from "react";
import HistoryDetailClient from "./HistoryDetailClient";

export const metadata = {
  title: "History Detail - Image",
  description: "View the details of this image in the history.",
  openGraph: {
    title: "History Detail - Image",
    description: "Explore the details of this image in the history.",
    images: ["/bg/banner.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "History Detail - Image",
    description: "Explore the details of this image in the history.",
    images: ["/bg/banner.png"],
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
