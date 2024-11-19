"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User } from "firebase/auth";
import { onAuthStateChange } from "@/lib/firebase";
import { Compare } from "@/components/ui/compare";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { FileUpload } from "@/components/ui/file-upload";

import { useGSAP } from "@gsap/react";
import { animateWithGsapBottom } from "@/lib/animation";
import MobileImageUploadSection from "@/components/sections/MobileImageUploadSection";

interface ImageObject {
  _id: string;
  image: string; // Base64-encoded image string
  prompt: string; // Image generation prompt
}
interface InputSectionProps {
  onNewImage: (newImage: ImageObject) => void;
}

const ImageUploadPage = () => {
  useGSAP(() => {
    animateWithGsapBottom("#uploadSection", {
      y: 0,
      opacity: 1,
      duration: 0.5,
    });
  }, []);

  const [prompt, setPrompt] = useState("");
  const [sampler, setSampler] = useState("Euler");
  const [steps, setSteps] = useState("50");
  const [cfgScale, setCfgScale] = useState("5");
  const [width, setWidth] = useState("512");
  const [height, setHeight] = useState("512");
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [transformedImage, setTransformedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [transformLoading, setTransformLoading] = useState(false);
  const [files, setFiles] = useState<File[]>();
  const [file, setFile] = useState<File>();

  const handleFileUpload = (file: File) => {
    setFile(file);
    console.log(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };
  const uploadImage = () => {
    if (!file) {
      console.log("No file selected.");
      return;
    }

    // const file = files[0];
    const reader = new FileReader();

    // Convert the file to Base64
    reader.onloadend = async () => {
      const base64String = reader.result as string; // Base64 encoded image
      const base64Data = base64String.replace(
        /^data:image\/[a-z]+;base64,/,
        ""
      );

      console.log("Base64 Image String:", base64Data); // Log raw base64 string
      setOriginalImage(base64Data);

      const body = {
        input: {
          workflow: {
            "6": {
              inputs: {
                text: "An extreme close up look of a person with a face like Moo Deng, baby pygmy hippo.The person's face has dark brown skin glistening with water just like Moo Deng, and has its mouth open wide, small, round ears are visible, and eyes are wide and alert. The person is wearing some clothes, have some hair and no sign of nudity or any kind of profanity.",
                clip: ["11", 0],
              },
              class_type: "CLIPTextEncode",
              _meta: {
                title: "CLIP Text Encode (Prompt)",
              },
            },
            "8": {
              inputs: {
                samples: ["13", 0],
                vae: ["10", 0],
              },
              class_type: "VAEDecode",
              _meta: {
                title: "VAE Decode",
              },
            },
            "9": {
              inputs: {
                filename_prefix: "ComfyUI",
                images: ["8", 0],
              },
              class_type: "SaveImage",
              _meta: {
                title: "Save Image",
              },
            },
            "10": {
              inputs: {
                vae_name: "ae.safetensors",
              },
              class_type: "VAELoader",
              _meta: {
                title: "Load VAE",
              },
            },
            "11": {
              inputs: {
                clip_name1: "t5xxl_fp16.safetensors",
                clip_name2: "clip_l.safetensors",
                type: "flux",
              },
              class_type: "DualCLIPLoader",
              _meta: {
                title: "DualCLIPLoader",
              },
            },
            "12": {
              inputs: {
                unet_name: "flux1-dev.safetensors",
                weight_dtype: "default",
              },
              class_type: "UNETLoader",
              _meta: {
                title: "Load Diffusion Model",
              },
            },
            "13": {
              inputs: {
                noise: ["25", 0],
                guider: ["22", 0],
                sampler: ["16", 0],
                sigmas: ["17", 0],
                latent_image: ["43", 0],
              },
              class_type: "SamplerCustomAdvanced",
              _meta: {
                title: "SamplerCustomAdvanced",
              },
            },
            "16": {
              inputs: {
                sampler_name: "euler",
              },
              class_type: "KSamplerSelect",
              _meta: {
                title: "KSamplerSelect",
              },
            },
            "17": {
              inputs: {
                scheduler: "beta",
                steps: 6,
                denoise: 0.61,
                model: ["40", 0],
              },
              class_type: "BasicScheduler",
              _meta: {
                title: "BasicScheduler",
              },
            },
            "22": {
              inputs: {
                model: ["40", 0],
                conditioning: ["29", 0],
              },
              class_type: "BasicGuider",
              _meta: {
                title: "BasicGuider",
              },
            },
            "25": {
              inputs: {
                noise_seed: Math.floor(Math.random() * 999999999999) + 1,
              },
              class_type: "RandomNoise",
              _meta: {
                title: "RandomNoise",
              },
            },
            "29": {
              inputs: {
                guidance: 3.5,
                conditioning: ["6", 0],
              },
              class_type: "FluxGuidance",
              _meta: {
                title: "FluxGuidance",
              },
            },
            "30": {
              inputs: {
                image: "current.png",
                upload: "current.png",
              },
              class_type: "LoadImage",
              _meta: {
                title: "Load Image",
              },
            },
            "40": {
              inputs: {
                lora_name: "MooDeng.safetensors",
                strength_model: 0.8,
                strength_clip: 1,
                model: ["12", 0],
                clip: ["11", 0],
              },
              class_type: "LoraLoader",
              _meta: {
                title: "Load LoRA",
              },
            },
            "42": {
              inputs: {
                upscale_method: "lanczos",
                megapixels: 1,
                image: ["30", 0],
              },
              class_type: "ImageScaleToTotalPixels",
              _meta: {
                title: "ImageScaleToTotalPixels",
              },
            },
            "43": {
              inputs: {
                pixels: ["42", 0],
                vae: ["10", 0],
              },
              class_type: "VAEEncode",
              _meta: {
                title: "VAE Encode",
              },
            },
          },
          images: [
            {
              name: "current.png",
              image: base64Data,
            },
          ],
        },
      };

      console.log(
        "Sample Request Body with Base64 Image:",
        JSON.stringify(body, null, 2)
      );

      console.log("POSTING to endpoint...");
      setTransformLoading(true);

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_RUNPOD_SERVERLESS_ENDPOINT}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_RUNPOD_API_KEY}`,
            },
            body: JSON.stringify(body),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Success!");
        console.log("API Response:", data);

        if (data.output.message) {
          setTransformedImage(data.output.message);
          const base64Image = data.output.message;

          // Call Cloudinary upload function
          const cloudinaryResponse = await fetch("/api/upload-to-cloudinary", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ base64Image }),
          });

          const cloudinaryData = await cloudinaryResponse.json();

          console.log("Cloudinary URL:", cloudinaryData.url);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setTransformLoading(false);
      }
    };

    reader.readAsDataURL(file); // Trigger file to Base64 conversion
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = `data:image/png;base64,${transformedImage}`;
    link.download = "transformed-image.png";
    link.click();
  };

  return (
    <div className="md: w-full md:flex flex-col items-center justify-center">
      <div className="hidden md:block w-full max-w-4xl py-48">
        <div
          id="uploadSection"
          className="w-full max-w-4xl mx-auto h-96 border border-dashed border-neutral-800 rounded-lg"
        >
          {!transformLoading && (
            <FileUpload onChange={handleFileUpload} uploadImage={uploadImage} />
          )}

          {transformLoading && (
            <div className="w-full flex flex-col items-center justify-center h-full">
              <h1 className="mb-6 mx-auto text-center animate-pulse font-bold font-sans text-xl">
                Generating your image..
              </h1>
              {/* <h1>Hang on tight! This usually takes a few seconds.</h1> */}
              <div className="w-[50%] bg-gray-100 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full animate-pulse"
                  style={{ width: "100%" }}
                />
              </div>
            </div>
          )}
        </div>
        {!transformLoading && transformedImage && (
          <div className="px-4 py-12 rounded-3xl w-full flex items-center justify-center space-x-12">
            <div className="flex flex-col items-center justify-center w-[256px]">
              <h1 className="text-5xl text-center">Ta-Daa !</h1>
              <Button
                className="text-lg font-sans mt-7 px-7 py-6"
                onClick={handleDownload}
              >
                Save your Image
              </Button>
            </div>
            <Compare
              firstImage={`data:image/png;base64,${originalImage}`}
              secondImage={`data:image/png;base64,${transformedImage}`}
              firstImageClassName="object-cover"
              secondImageClassname="object-cover"
              className="h-[250px] w-[200px] md:h-[500px] md:w-[500px]"
              slideMode="hover"
            />
          </div>
        )}
      </div>

      {/* Mobile Section */}
      <div className="block md:hidden">
        <MobileImageUploadSection />
      </div>
    </div>
  );
};

export default ImageUploadPage;
