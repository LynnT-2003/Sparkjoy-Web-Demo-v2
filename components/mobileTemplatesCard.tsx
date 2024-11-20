"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ArrowRightIcon, CheckIcon } from "lucide-react";
import { FileUploadMobile } from "./ui/file-upload-mobile";
import { Alert, Snackbar } from "@mui/material";

interface MobileTemplatesCardProps {
  image: string;
  template: string;
  title: string;
  description: string;
}

const MobileTemplatesCard: React.FC<MobileTemplatesCardProps> = ({
  image,
  template,
  title,
  description,
}) => {
  const router = useRouter();

  // const [file, setFile] = useState<File>();
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [transformedImage, setTransformedImage] = useState<string | null>(null);
  const [transformLoading, setTransformLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertOpen, setAlertOpen] = useState<boolean>(false);

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  const handleFileUpload = (file: File) => {
    try {
      console.log("File uploaded:", file);

      // Check if file size exceeds 5MB
      if (file.size > 5 * 1024 * 1024) {
        // Trigger the alert for files over 5MB
        console.log("File size exceeds 5MB. Please upload a smaller file.");
        setAlertOpen(true);
        return;
      }

      const reader = new FileReader();
      // const chosenTemplate = template;

      reader.onload = () => {
        const base64String = reader.result as string;
        localStorage.setItem("uploadedFile", base64String);
        localStorage.setItem("template", template);
        router.push("/ImageUpload/upload-success");
      };

      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Error during file upload:", error);
      alert("An error occurred during the file upload. Please try again.");
    }
  };

  const uploadImage = () => {
    // if (!file) {
    //   console.log("No file selected.");
    //   return;
    // }
    // // const file = files[0];
    // const reader = new FileReader();
    // // Convert the file to Base64
    // reader.onloadend = async () => {
    //   const base64String = reader.result as string; // Base64 encoded image
    //   const base64Data = base64String.replace(
    //     /^data:image\/[a-z]+;base64,/,
    //     ""
    //   );
    //   console.log("Base64 Image String:", base64Data); // Log raw base64 string
    //   setOriginalImage(base64Data);
    //   const body = {
    //     input: {
    //       workflow: {
    //         "6": {
    //           inputs: {
    //             text: "An extreme close up look of a person with a face like Moo Deng, baby pygmy hippo.The person's face has dark brown skin glistening with water just like Moo Deng, and has its mouth open wide, small, round ears are visible, and eyes are wide and alert. The person is wearing some clothes, have some hair and no sign of nudity or any kind of profanity.",
    //             clip: ["11", 0],
    //           },
    //           class_type: "CLIPTextEncode",
    //           _meta: {
    //             title: "CLIP Text Encode (Prompt)",
    //           },
    //         },
    //         "8": {
    //           inputs: {
    //             samples: ["13", 0],
    //             vae: ["10", 0],
    //           },
    //           class_type: "VAEDecode",
    //           _meta: {
    //             title: "VAE Decode",
    //           },
    //         },
    //         "9": {
    //           inputs: {
    //             filename_prefix: "ComfyUI",
    //             images: ["8", 0],
    //           },
    //           class_type: "SaveImage",
    //           _meta: {
    //             title: "Save Image",
    //           },
    //         },
    //         "10": {
    //           inputs: {
    //             vae_name: "ae.safetensors",
    //           },
    //           class_type: "VAELoader",
    //           _meta: {
    //             title: "Load VAE",
    //           },
    //         },
    //         "11": {
    //           inputs: {
    //             clip_name1: "t5xxl_fp16.safetensors",
    //             clip_name2: "clip_l.safetensors",
    //             type: "flux",
    //           },
    //           class_type: "DualCLIPLoader",
    //           _meta: {
    //             title: "DualCLIPLoader",
    //           },
    //         },
    //         "12": {
    //           inputs: {
    //             unet_name: "flux1-dev.safetensors",
    //             weight_dtype: "default",
    //           },
    //           class_type: "UNETLoader",
    //           _meta: {
    //             title: "Load Diffusion Model",
    //           },
    //         },
    //         "13": {
    //           inputs: {
    //             noise: ["25", 0],
    //             guider: ["22", 0],
    //             sampler: ["16", 0],
    //             sigmas: ["17", 0],
    //             latent_image: ["43", 0],
    //           },
    //           class_type: "SamplerCustomAdvanced",
    //           _meta: {
    //             title: "SamplerCustomAdvanced",
    //           },
    //         },
    //         "16": {
    //           inputs: {
    //             sampler_name: "euler",
    //           },
    //           class_type: "KSamplerSelect",
    //           _meta: {
    //             title: "KSamplerSelect",
    //           },
    //         },
    //         "17": {
    //           inputs: {
    //             scheduler: "beta",
    //             steps: 6,
    //             denoise: 0.61,
    //             model: ["40", 0],
    //           },
    //           class_type: "BasicScheduler",
    //           _meta: {
    //             title: "BasicScheduler",
    //           },
    //         },
    //         "22": {
    //           inputs: {
    //             model: ["40", 0],
    //             conditioning: ["29", 0],
    //           },
    //           class_type: "BasicGuider",
    //           _meta: {
    //             title: "BasicGuider",
    //           },
    //         },
    //         "25": {
    //           inputs: {
    //             noise_seed: Math.floor(Math.random() * 999999999999) + 1,
    //           },
    //           class_type: "RandomNoise",
    //           _meta: {
    //             title: "RandomNoise",
    //           },
    //         },
    //         "29": {
    //           inputs: {
    //             guidance: 3.5,
    //             conditioning: ["6", 0],
    //           },
    //           class_type: "FluxGuidance",
    //           _meta: {
    //             title: "FluxGuidance",
    //           },
    //         },
    //         "30": {
    //           inputs: {
    //             image: "current.png",
    //             upload: "current.png",
    //           },
    //           class_type: "LoadImage",
    //           _meta: {
    //             title: "Load Image",
    //           },
    //         },
    //         "40": {
    //           inputs: {
    //             lora_name: "MooDeng.safetensors",
    //             strength_model: 0.8,
    //             strength_clip: 1,
    //             model: ["12", 0],
    //             clip: ["11", 0],
    //           },
    //           class_type: "LoraLoader",
    //           _meta: {
    //             title: "Load LoRA",
    //           },
    //         },
    //         "42": {
    //           inputs: {
    //             upscale_method: "lanczos",
    //             megapixels: 1,
    //             image: ["30", 0],
    //           },
    //           class_type: "ImageScaleToTotalPixels",
    //           _meta: {
    //             title: "ImageScaleToTotalPixels",
    //           },
    //         },
    //         "43": {
    //           inputs: {
    //             pixels: ["42", 0],
    //             vae: ["10", 0],
    //           },
    //           class_type: "VAEEncode",
    //           _meta: {
    //             title: "VAE Encode",
    //           },
    //         },
    //       },
    //       images: [
    //         {
    //           name: "current.png",
    //           image: base64Data,
    //         },
    //       ],
    //     },
    //   };
    //   console.log(
    //     "Sample Request Body with Base64 Image:",
    //     JSON.stringify(body, null, 2)
    //   );
    //   console.log("POSTING to endpoint...");
    //   setTransformLoading(true);
    //   try {
    //     const response = await fetch(
    //       `${process.env.NEXT_PUBLIC_RUNPOD_SERVERLESS_ENDPOINT}`,
    //       {
    //         method: "POST",
    //         headers: {
    //           "Content-Type": "application/json",
    //           Authorization: `Bearer ${process.env.NEXT_PUBLIC_RUNPOD_API_KEY}`,
    //         },
    //         body: JSON.stringify(body),
    //       }
    //     );
    //     if (!response.ok) {
    //       throw new Error(`HTTP error! Status: ${response.status}`);
    //     }
    //     const data = await response.json();
    //     console.log("Success!");
    //     console.log("API Response:", data);
    //     if (data.output.message) {
    //       setTransformedImage(data.output.message);
    //       const base64Image = data.output.message;
    //       // Call Cloudinary upload function
    //       const cloudinaryResponse = await fetch("/api/upload-to-cloudinary", {
    //         method: "POST",
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({ base64Image }),
    //       });
    //       const cloudinaryData = await cloudinaryResponse.json();
    //       console.log("Cloudinary URL:", cloudinaryData.url);
    //     }
    //   } catch (error) {
    //     console.error("Error:", error);
    //   } finally {
    //     setTransformLoading(false);
    //   }
    // };
    // reader.readAsDataURL(file); // Trigger file to Base64 conversion
  };

  return (
    <div className="relative mt-[-2rem] w-full z-10">
      <div className="mx-6 bg-[#202020] rounded-xl p-4">
        <div className="relative h-[12rem] w-full">
          <Image
            src={image}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="absolute inset-0"
          />
        </div>
        <h1 className="pt-4 font-sans font-semibold text-lg">{title}</h1>
        <h1 className="pt-2 font-sans text-sm text-justify">{description}</h1>
        <div className="mt-4 w-full">
          <Sheet>
            <SheetTrigger asChild className="w-full">
              <div className="w-full text-sm text-purple-300 font-semibold">
                <h1 className="w-full flex items-center">
                  Try now <ArrowRightIcon size={16} className="ml-1" />
                </h1>
              </div>
            </SheetTrigger>
            <SheetContent side="bottom" className="md:hidden">
              {/* <SheetHeader>
                <SheetTitle>Edit profile</SheetTitle>
                <SheetDescription>
                  Make changes to your profile here. Click save when you're
                  done.
                </SheetDescription>
              </SheetHeader> */}
              <FileUploadMobile onChange={handleFileUpload} />
              {/* <SheetFooter>
                <SheetClose asChild>
                  <Button type="submit">Save changes</Button>
                </SheetClose>
              </SheetFooter> */}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default MobileTemplatesCard;
