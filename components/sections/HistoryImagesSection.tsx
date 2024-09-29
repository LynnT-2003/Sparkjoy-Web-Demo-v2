"use client";
import React, { useEffect, useState } from "react";

const HistoryImagesSection = () => {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchSavedImages = async () => {
      try {
        const response = await fetch("/api/savedImages", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch saved images");
        }

        const data = await response.json();
        const fetchedImages = data; // Assuming the API response includes an `images` field

        // Assuming the response contains base64-encoded images
        setImages(fetchedImages || []);
        setLoading(false); // Stop loading once images are fetched
        console.log("Fetched images:", fetchedImages);
      } catch (error) {
        console.error("Error fetching saved images:", error);
        setLoading(false); // Stop loading even if there's an error
      }
    };

    fetchSavedImages();
  }, []);

  return (
    <div className="px-24">
      <h2 className="text-xl font-bold mt-12 mb-4 ">
        History of Generated Images
      </h2>

      {loading ? (
        <div className="flex justify-center items-center h-20">
          {/* Add loading bar or spinner here */}
          <div className="w-24 h-2 bg-gray-300 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 animate-pulse"></div>
          </div>
          <p className="ml-4">Loading...</p>
        </div>
      ) : images.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div key={index} className="p-2 lg-rounded">
              <img
                src={`data:image/png;base64,${image}`} // Assuming images are base64-encoded
                alt={`Generated Image ${index}`}
                className="w-full h-auto rounded-lg"
              />
            </div>
          ))}
        </div>
      ) : (
        <p>No images generated yet!</p>
      )}
    </div>
  );
};

export default HistoryImagesSection;
