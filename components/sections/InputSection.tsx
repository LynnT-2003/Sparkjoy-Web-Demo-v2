"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const InputSection = () => {
  const [prompt, setPrompt] = useState("");
  const [sampler, setSampler] = useState("Euler");
  const [steps, setSteps] = useState("50");
  const [cfgScale, setCfgScale] = useState("5");
  const [width, setWidth] = useState("512");
  const [height, setHeight] = useState("512");
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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
              width: 512,
              height: 512,
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
      }

      // Save the response to MongoDB
      const mongoBody = {
        delayTime: data.delayTime,
        executionTime: data.executionTime,
        image: data.output.message,
        prompt: prompt || "Default prompt here",
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
    <div className="h-[120vh] w-screen flex flex-col items-center justify-center ">
      {!image ? (
        <div className="">
          <div className="text-8xl text-center font-bold font-sans relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 pb-4">
            <div className="">Start Creating</div>
          </div>
        </div>
      ) : (
        <div>
          <div className="text-6xl text-center font-bold font-sans relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 pb-4">
            <div className="">Create & Innovate . .</div>
          </div>
        </div>
      )}

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
      </div>

      {/* Display loading progress bar */}
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
