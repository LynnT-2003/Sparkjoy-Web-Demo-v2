"use client";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { IconUpload } from "@tabler/icons-react";
import { useDropzone } from "react-dropzone";
import { Alert, Snackbar } from "@mui/material";
import {
  Camera,
  CameraIcon,
  CheckIcon,
  UploadCloudIcon,
  UploadIcon,
} from "lucide-react";
import Webcam from "react-webcam";
import { CircularProgress } from "@mui/material";

const mainVariant = {
  initial: {
    x: 0,
    y: 0,
  },
  animate: {
    x: 20,
    y: -20,
    opacity: 0.9,
  },
};

const secondaryVariant = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
};

export const FileUploadMobile = ({
  onChange,
}: {
  onChange?: (file: File) => void;
}) => {
  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [alertOpen, setAlertOpen] = useState<boolean>(false);

  const handleFileChange = (newFile: File) => {
    setFile(newFile);
    onChange && onChange(newFile);
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleReset = () => {
    setFile(null); // Clear the file state
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset the file input value
    }
  };

  const { getRootProps, isDragActive } = useDropzone({
    multiple: false,
    noClick: true,
    maxSize: 5 * 1024 * 1024,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
    },
    onDrop: (acceptedFiles) => handleFileChange(acceptedFiles[0]),
    onDropRejected: (error) => {
      console.log(error);
    },
  });

  // Webcam
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const webcamRef = useRef<Webcam>(null);
  const cameraModalRef = useRef<HTMLDivElement | null>(null);

  const handleOpenCamera = () => setIsCameraOpen(true);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        cameraModalRef.current &&
        !cameraModalRef.current.contains(event.target as Node)
      ) {
        setIsCameraOpen(false);
      }
    };

    if (isCameraOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCameraOpen]);

  const handleCapture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        // setFile(imageSrc); // Set the captured image as the file
        localStorage.setItem("uploadedFile", imageSrc);
        console.log("Captured Image: ", imageSrc);
        setIsCameraOpen(false);
        router.push("/ImageUpload/upload-success");
      }
    }
  };

  return (
    <div
      className="w-full flex justify-center py-6 md:mb-0"
      {...getRootProps()}
    >
      {alertOpen && (
        <Snackbar
          open={alertOpen}
          autoHideDuration={6000}
          onClose={handleAlertClose}
          className="mx-auto w-[75vw] absolute top-[-15rem] z-50"
        >
          <Alert
            onClose={handleAlertClose}
            severity="error"
            sx={{ width: "100%" }}
          >
            File size exceeds 5MB. Please upload a smaller file.
          </Alert>
        </Snackbar>
      )}

      <motion.div
        whileHover="animate"
        className="px-2 pb-7 group/file block rounded-lg cursor-pointer w-full relative overflow-hidden"
      >
        <input
          ref={fileInputRef}
          id="file-upload-handle"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={(e) => {
            const selectedFile = e.target.files?.[0];
            if (selectedFile) {
              // Validate file size
              if (selectedFile.size > 5 * 1024 * 1024) {
                setAlertOpen(true);
              } else {
                handleFileChange(selectedFile); // Proceed with file processing
              }

              // Reset the file input so the same file can be selected again
              if (fileInputRef.current) {
                fileInputRef.current.value = ""; // Clear the value programmatically
              }
            }
          }}
          className="hidden"
        />

        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
          <GridPattern />
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="relative z-20 font-sans font-bold text-neutral-300 text-lg">
            Upload Your Image
          </p>
          <p className="hidden md:block relative z-20 font-sans font-normal text-neutral-400 dark:text-neutral-400 text-base mt-2">
            Drag or drop your file here or click to upload.
          </p>
          <div className="w-full flex space-x-8">
            <div className="relative w-1/2">
              <motion.div
                onClick={handleOpenCamera}
                whileHover="animate"
                className={cn(
                  "relative group-hover/file:shadow-2xl z-40 bg-neutral-900 flex items-center justify-center aspect-square mt-10 w-full rounded-md",
                  "shadow-[0px_10px_50px_rgba(0,0,0,0.1)]"
                )}
              >
                <div className="flex flex-col items-center justify-center">
                  <p className="relative z-20 font-sans font-bold text-neutral-300 text-lg">
                    <CameraIcon className="h-12 w-12" />
                  </p>
                </div>
              </motion.div>

              {/* Webcam Modal */}
              {isCameraOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                  <div
                    ref={cameraModalRef}
                    className="bg-[#181818] p-6 w-[85vw] rounded-lg flex flex-col items-center mt-[-10rem]"
                  >
                    <div className="flex items-center justify-center relative">
                      <CircularProgress
                        color="inherit"
                        size={50}
                        className="absolute z-10" // Set CircularProgress behind the webcam
                      />

                      <Webcam
                        ref={webcamRef}
                        audio={false}
                        screenshotFormat="image/jpeg"
                        className="w-full h-auto z-20" // Position Webcam on top with higher z-index
                      />
                    </div>

                    <div className="flex items-center mt-4 w-full">
                      <div className="flex w-full space-x-2">
                        <Button
                          onClick={() => setIsCameraOpen(false)}
                          variant="outline"
                          className="bg-red-900 w-full border-none"
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={handleCapture}
                          variant="outline"
                          className="w-full"
                        >
                          Capture
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="relative w-1/2">
              <motion.div
                layoutId="file-upload"
                variants={mainVariant}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                className={cn(
                  "relative group-hover/file:shadow-2xl z-40 bg-neutral-900 flex items-center justify-center aspect-square mt-10 w-full rounded-md",
                  "shadow-[0px_10px_50px_rgba(0,0,0,0.1)]"
                )}
                onClick={handleClick}
              >
                {isDragActive ? (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-neutral-600 flex flex-col items-center"
                  >
                    Drop it
                    <UploadIcon className="h-10 w-10 dark:text-neutral-400" />
                  </motion.p>
                ) : (
                  <UploadIcon className="h-10 w-10 dark:text-neutral-300" />
                )}
              </motion.div>

              {!file && (
                <motion.div
                  variants={secondaryVariant}
                  className="absolute opacity-0 border border-dashed border-sky-400 inset-0 z-30 bg-transparent flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md"
                ></motion.div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export function GridPattern() {
  const columns = 41;
  const rows = 11;
  return (
    <div className="flex bg-neutral-900 flex-shrink-0 flex-wrap justify-center items-center gap-x-px gap-y-px  scale-105">
      {Array.from({ length: rows }).map((_, row) =>
        Array.from({ length: columns }).map((_, col) => {
          const index = row * columns + col;
          return (
            <div
              key={`${col}-${row}`}
              className={`w-10 h-10 flex flex-shrink-0 rounded-[2px] ${
                index % 2 === 0
                  ? "bg-neutral-950"
                  : "bg-neutral-950 shadow-[0px_0px_1px_3px_rgba(0,0,0,1)_inset]"
              }`}
            />
          );
        })
      )}
    </div>
  );
}
