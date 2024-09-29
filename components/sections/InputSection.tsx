"use client";
import React, { useState } from "react";
import connectMongoDB from "@/lib/mongodb";
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
  const [image, setImage] = useState<string | null>(null); // State to hold the Base64 image

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
    const body = {
      input: {
        prompt: prompt || "1girl, anime, best quality, good quality", // Default if no prompt is provided
        negative_prompt: "animals", // Set to "animals" as per the provided example
        sampler_name: sampler,
        steps: parseInt(steps, 10),
        cfg_scale: parseInt(cfgScale, 10),
        width: parseInt(width, 10),
        height: parseInt(height, 10),
      },
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_RUNPOD_SERVERLESS_ENDPOINT}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.RUNPOD_API_KEY}`, // Include Bearer token
          },
          body: JSON.stringify(body),
        }
      );

      const data = await response.json();
      console.log("Parsed JSON data:", data);

      if (data.output.images[0]) {
        setImage(data.output.images[0]); // Set the Base64 image string
      }

      // Save the response to MongoDB
      const mongoBody = {
        delayTime: data.delayTime,
        executionTime: data.executionTime,
        images: data.output.images, // The images array
        info: data.output.info, // The info string
      };
      console.log("Saving response to MongoDB...", mongoBody);

      try {
        const mongoResponse = await fetch("/api/saveImageResponse", {
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
    }
  };

  return (
    <div>
      <div className="w-[25vw]">
        <Input type="text" placeholder="Prompt" onChange={handlePromptChange} />
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="text-md">
              Customize
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
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
        <button
          onClick={handleSubmitClick}
          className="mt-4 mx-4 px-6 py-1.5 bg-blue-500 text-white text-md rounded"
        >
          Submit
        </button>
      </div>

      {/* Display the Base64 image if it exists */}
      {image && (
        <div className="mt-4">
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
