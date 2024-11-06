"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User } from "firebase/auth";
import { onAuthStateChange } from "@/lib/firebase";
import { Compare } from "../ui/compare";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { FileUpload } from "../ui/file-upload";

import { useGSAP } from "@gsap/react";
import { animateWithGsapRight, animateWithGsapBottom } from "@/lib/animation";

interface ImageObject {
  _id: string;
  image: string; // Base64-encoded image string
  prompt: string; // Image generation prompt
}
interface InputSectionProps {
  onNewImage: (newImage: ImageObject) => void;
}

const InputSection: React.FC<InputSectionProps> = ({ onNewImage }) => {
  useGSAP(() => {
    animateWithGsapBottom("#create", { y: 0, opacity: 1, duration: 1 });
    animateWithGsapRight("#options", { x: 0, opacity: 1, duration: 1 });
  }, []);

  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      if (user) {
        setUser(user);
        console.log("User is now: ", user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
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
          "https://api.runpod.ai/v2/p9sesagtclzjrr/runsync",
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

        setTransformedImage(data.output.message);
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

  const handlePrint = () => {
    const imageWindow = window.open("", "_blank");
    if (imageWindow) {
      // Check if the window was opened successfully
      imageWindow.document.write(`
        <html>
          <head>
            <title>Print Image</title>
          </head>
          <body>
            <img src="data:image/png;base64,${transformedImage}" alt="Transformed Image" style="width:100%; max-width:800px;" />
            <script>
              window.onload = function() {
                window.print();
              }
            </script>
          </body>
        </html>
      `);
      imageWindow.document.close();
    } else {
      console.error("Failed to open a new window for printing.");
    }
  };

  const handlePromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
  };

  const handleSamplerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSampler(e.target.value);
  };

  const handleStepsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSteps(e.target.value);
  };

  const handleCfgScaleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCfgScale(e.target.value);
  };

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWidth(e.target.value);
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeight(e.target.value);
  };

  const handleSubmitClick = async () => {
    setLoading(true); // Set loading state to true when the request starts

    const body = {
      input: {
        workflow: {
          "5": {
            inputs: {
              width: 1024,
              height: 1024,
              batch_size: 1,
            },
            class_type: "EmptyLatentImage",
            _meta: {
              title: "Empty Latent Image",
            },
          },
          "6": {
            inputs: {
              text: prompt || "Default prompt here", // Set prompt dynamically
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
              clip_name1: "t5xxl_fp8_e4m3fn.safetensors",
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
              weight_dtype: "fp8_e4m3fn",
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
              latent_image: ["5", 0],
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
              scheduler: "sgm_uniform",
              steps: 4,
              denoise: 1,
              model: ["12", 0],
            },
            class_type: "BasicScheduler",
            _meta: {
              title: "BasicScheduler",
            },
          },
          "22": {
            inputs: {
              model: ["12", 0],
              conditioning: ["6", 0],
            },
            class_type: "BasicGuider",
            _meta: {
              title: "BasicGuider",
            },
          },
          "25": {
            inputs: {
              noise_seed: 108076821791990,
            },
            class_type: "RandomNoise",
            _meta: {
              title: "RandomNoise",
            },
          },
        },
      },
    };

    console.log("Body:", body);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_RUNPOD_SERVERLESS_ENDPOINT}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_RUNPOD_API_KEY}`, // Include Bearer token
          },
          body: JSON.stringify(body),
        }
      );

      const data = await response.json();
      console.log("Parsed JSON data:", data);

      if (data.output.message) {
        setImage(data.output.message); // Set the Base64 image string
        const newImage = {
          _id: data.id,
          image: data.output.message,
          prompt: body.input.workflow["6"].inputs.text,
        };
        onNewImage(newImage); // Call onNewImage with the new image object
      }

      // Save the response to MongoDB
      const mongoBody = {
        delayTime: data.delayTime,
        executionTime: data.executionTime,
        image: data.output.message,
        prompt: prompt || "Default prompt here",
        userId: user?.uid,
        username: user?.displayName,
      };

      // console.log("Lets post to MongoDB later:", data);
      console.log("Posting", mongoBody);
      try {
        const mongoResponse = await fetch("/api/savedImages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(mongoBody),
        });
        console.log("MongoDB response status:", mongoResponse.status);
        const mongoResponseBody = await mongoResponse.json();
        console.log("MongoDB response body:", mongoResponseBody);
      } catch (error) {
        console.error("Error saving to MongoDB:", error);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false); // Set loading state to false after request completes
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      {!image ? (
        <div className="">
          <div
            id="create"
            className="text-6xl text-center font-bold font-sans relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 pb-4"
          >
            <div className="">Start Creating Your Own !</div>
          </div>
        </div>
      ) : (
        <div>
          <div className="text-6xl text-center font-bold font-sans relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 pb-4">
            <div className="">Create & Innovate . .</div>
          </div>
        </div>
      )}

      {/* <div className="w-full mt-12 max-w-4xl mx-auto h-96 border border-dashed bg-black border-neutral-800 rounded-lg">
        {!transformLoading && (
          <FileUpload onChange={handleFileUpload} uploadImage={uploadImage} />
        )}

        {transformLoading && (
          <div className="w-full flex flex-col items-center justify-center h-full">
            <h1 className="mb-6 mx-auto text-center animate-pulse font-bold font-sans text-xl">
              Generating your image..
            </h1>
            <div className="w-[50%] bg-gray-100 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full animate-pulse"
                style={{ width: "100%" }}
              />
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col justify-center w-[600px] mt-8">
        <Input
          type="text"
          placeholder="Enter a Prompt . . ."
          onChange={handlePromptChange}
          className="text-lg py-9 pl-9 mb-2"
        />
        <div className="flex w-full gap-6 ">
          <div className="w-1/2 mt-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  disabled={true}
                  className="text-md w-full p-6 hover:bg-slate-800 hover:border-slate-800 hover:text-white"
                >
                  Customize
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Customize</h4>
                    <p className="text-sm text-muted-foreground">
                      Set additional settings for the generated image.
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="sampler_name">Sampler</Label>
                      <Input
                        id="sampler_name"
                        value={sampler}
                        onChange={handleSamplerChange}
                        className="col-span-2 h-8"
                      />
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="steps">Steps</Label>
                      <Input
                        id="steps"
                        value={steps}
                        onChange={handleStepsChange}
                        className="col-span-2 h-8"
                      />
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="cfg_scale">Cfg Scale</Label>
                      <Input
                        id="cfg_scale"
                        value={cfgScale}
                        onChange={handleCfgScaleChange}
                        className="col-span-2 h-8"
                      />
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="width">Width</Label>
                      <Input
                        id="width"
                        value={width}
                        onChange={handleWidthChange}
                        className="col-span-2 h-8"
                      />
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="height">Height</Label>
                      <Input
                        id="height"
                        value={height}
                        onChange={handleHeightChange}
                        className="col-span-2 h-8"
                      />
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <Button
            variant="outline"
            onClick={handleSubmitClick}
            className="hover:bg-no-repeat hover:border-none hover:text-xl hover:bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 hover:text-white w-1/2 mt-4 px-6 py-1.5 bg-white text-black text-md rounded p-6"
          >
            Submit
          </Button>
        </div>
      </div> */}

      {/* Display loading progress bar */}

      <div className="w-full mx-24 mt-12 ">
        <div
          id="options"
          className="flex gap-12 mt-4 items-center justify-center"
        >
          <div
            className="flex flex-col items-center justify-center group"
            onClick={() => {
              router.push("/ImageUpload");
            }}
          >
            <img
              src="/abstract1.png"
              alt="logo"
              className="w-[500px] grayscale opacity-75 group-hover:opacity-100 group-hover:grayscale-0 transition duration-300 ease-in-out"
            />
            <h1 className="text-center mt-6 text-2xl font-bold  group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-green-300 group-hover:via-cyan-500 group-hover:to-blue-300 transition duration-300 ease-in-out">
              Upload an Image
            </h1>
          </div>

          <div
            className="flex flex-col items-center justify-center group"
            onClick={() => {
              router.push("/Prompt");
            }}
          >
            <img
              src="/abstract2.png"
              alt="logo"
              className="w-[500px] grayscale opacity-75 group-hover:opacity-100 group-hover:grayscale-0 transition duration-300 ease-in-out"
            />
            <h1 className="text-center mt-6 text-2xl font-bold group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:via-violet-500 group-hover:to-pink-500 transition duration-300 ease-in-out">
              Create a Prompt
            </h1>
          </div>
        </div>
      </div>

      {!transformLoading && transformedImage && (
        // <div className="mt-8 w-screen flex items-center justify-center">
        //   <img
        //     src={`data:image/png;base64,${originalImage}`} // Update the format if needed
        //     alt="Generated"
        //     className="w-[512px] h-[512px] object-fit:cover"
        //   />
        //   <img
        //     src={`data:image/png;base64,${transformedImage}`} // Update the format if needed
        //     alt="Generated"
        //     className="w-[512px] h-[512px] object-fit:cover"
        //   />
        // </div>
        <div className="px-4 py-12 rounded-3xl w-full flex items-center justify-center space-x-12">
          <div className="flex flex-col items-center justify-center w-[256px]">
            <h1 className="text-5xl text-center">Ta-Daa !</h1>
            {/* <h1 className="text-2xl py-2 text-center font-light">
              Slide to Compare{" "}
            </h1> */}
            <Button
              variant="destructive"
              className="text-xl font-sans mt-5 px-7 py-5"
              onClick={handleDownload}
            >
              Save your Image
            </Button>
          </div>
          <Compare
            firstImage={`data:image/png;base64,${originalImage}`}
            secondImage={`data:image/png;base64,${transformedImage}`}
            firstImageClassName="object-cover object-left-top"
            secondImageClassname="object-cover object-left-top"
            className="h-[250px] w-[200px] md:h-[500px] md:w-[500px]"
            slideMode="hover"
          />
        </div>
      )}

      {loading && (
        <div className="mt-8 w-[512px]">
          <h1 className="mt-4 mb-6">Generating image for prompt: {prompt}</h1>
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full animate-pulse"
              style={{ width: "100%" }}
            />
          </div>
        </div>
      )}

      {/* Display the Base64 image if it exists */}
      {!loading && image && (
        <div className="mt-8 w-[512px]">
          <img
            src={`data:image/png;base64,${image}`} // Update the format if needed
            alt="Generated"
            className="max-w-full h-auto"
          />
        </div>
      )}
    </div>
  );
};

export default InputSection;
