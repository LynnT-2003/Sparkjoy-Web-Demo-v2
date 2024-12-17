"use client";
import React, { useState, useEffect } from "react";
import { Dices, Sparkles } from "lucide-react";
import { Share2Icon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import Image from "next/image";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { User } from "firebase/auth";
import { onAuthStateChange } from "@/lib/firebase";

// Register GSAP plugin
gsap.registerPlugin(ScrollToPlugin);

const MobilePromptSection = () => {
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

  const [prompt, setPrompt] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = `data:image/png;base64,${image}`;
    link.download = "prismaforge-image.png";
    link.click();
  };

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
  };

  const handleSubmitClick = async () => {
    setImage(null); // Reset the image state
    setLoading(true); // Set loading state to true when the request starts

    const newBody = {
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
              text:
                prompt ||
                "In the bustling district of Tokyo, 17-year-old Akiko Nakamura seems like an ordinary high school student, with her signature pastel pink hair tied in twin tails with rainbow ribbons and warm amber eyes that sparkle when she smiles. But beneath her cheerful exterior and perfectly pressed school uniform lies an extraordinary secret.", // Set prompt dynamically

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
              scheduler: "beta",
              steps: 20,
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
              noise_seed: Math.floor(1000 + Math.random() * 9000),
            },
            class_type: "RandomNoise",
            _meta: {
              title: "RandomNoise",
            },
          },
        },
      },
    };

    console.log("Posting to endpoint...");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_RUNPOD_SERVERLESS_ENDPOINT}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_RUNPOD_API_KEY}`, // Include Bearer token
          },
          body: JSON.stringify(newBody),
        }
      );

      const data = await response.json();
      console.log("Parsed JSON data:", data);

      if (data.output.message && user) {
        setImage(data.output.message);

        gsap.to(window, {
          duration: 0.5,
          scrollTo: { y: "#generatedSection", offsetY: 0 },
        });
      }

      if (data.output.message) {
        setImage(data.output.message); // Set the Base64 image string
        // const newImage = {
        //   _id: data.id,
        //   image: data.output.message,
        //   prompt: body.input.workflow["6"].inputs.text,
        // };
        const base64Image = data.output.message;

        // Call Cloudinary upload function
        console.log("Posting to Cloudinary...");
        const cloudinaryResponse = await fetch("/api/upload-to-cloudinary", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ base64Image }),
        });

        const cloudinaryData = await cloudinaryResponse.json();

        console.log("Cloudinary URL:", cloudinaryData.url);

        if (cloudinaryData.url) {
          // Save the response to MongoDB
          console.log("Posting to Mongodb...");

          const mongoBody = {
            delayTime: data.delayTime,
            executionTime: data.executionTime,
            image: cloudinaryData.url,
            prompt: prompt || "Default prompt here",
            userId: user?.uid,
            username: user?.displayName,
          };

          console.log("Lets post to MongoDB:", data);
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
        }
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false); // Set loading state to false after request completes
    }
  };

  return (
    <div className="pb-12">
      <h1 className="pl-14 pt-[1.55rem] text-2xl font-sans font-bold">
        Bring Your Ideas to Life
      </h1>
      <h1 className="pl-14 pt-2 text-2xl font-sans font-bold">
        With High Quality Visuals
      </h1>
      <div className="mx-8">
        {loading ? (
          <div className="h-[32vh] border-none border-transparent bg-gradient-to-r from-pink-900 via-purple-900 to-pink-900 mt-8 rounded-xl">
            <div className="h-full bg-[#191919] rounded-xl p-[2vh] flex flex-col justify-center items-center">
              <div className="w-[210px] rounded-full flex flex-col justify-center items-center ">
                <h1 className="font-sans font-semibold text-lg">
                  Crafting your image...
                </h1>
                <div
                  className="mt-6 mb-3 bg-gradient-to-r from-pink-900 via-purple-900 to-pink-900 h-2 rounded-full animate-pulse"
                  style={{ width: "100%" }}
                />
              </div>
              <h1 className="text-sm animate-pulse">
                This may take up to 30 seconds.
              </h1>
              <h1 className="text-sm animate-pulse">
                Please dont quit or refresh the page.
              </h1>
            </div>
          </div>
        ) : (
          <div className="h-[32vh] border border-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 mt-8 rounded-xl">
            <div className="h-full bg-[#191919] rounded-xl p-[2vh] flex flex-col justify-between">
              <div className="h-[20vh]">
                <Textarea
                  placeholder={"Enter a Prompt . . ."}
                  onInput={handlePromptChange}
                  value={prompt || ""}
                  className="h-[21vh] text-md font-sans border-0 outline-none focus:outline-none hover:outline-none"
                />
              </div>
              <div className="h-[4.5vh] flex items-center rounded-xl mt-auto">
                <div className="h-full ml-2">
                  <Dices className="h-full w-auto" />
                </div>
                <div
                  className="flex items-center ml-auto rounded-xl bg-gradient-to-r from-pink-800 to-purple-800 px-5 text-md h-full"
                  onClick={handleSubmitClick}
                >
                  Generate <Sparkles size={18} className="ml-1" />
                </div>
              </div>
            </div>
          </div>
        )}

        {!image && (
          <>
            {" "}
            <h1 className="mt-8 text-lg font-sans">Recently Generated</h1>
            <div className="flex flex-wrap justify-between w-full mt-[-0.3rem]">
              <div className="relative w-[40vw] h-[40vw] bg-[#202020] rounded-lg mt-4">
                <Image
                  src="/example/ex5.jpeg"
                  alt="Template"
                  layout="fill"
                  className="rounded-xl"
                />
              </div>
              <div className="relative w-[40vw] h-[40vw] bg-[#202020] rounded-lg mt-4">
                <Image
                  src="/example/ex3.png"
                  alt="Template"
                  layout="fill"
                  className="rounded-xl"
                />
              </div>
              <div className="relative w-[40vw] h-[40vw] bg-[#202020] rounded-lg mt-4">
                <Image
                  src="/example/ex1.jpeg"
                  alt="Template"
                  layout="fill"
                  className="rounded-xl"
                />
              </div>
              <div className="relative w-[40vw] h-[40vw] bg-[#202020] rounded-lg mt-4">
                <Image
                  src="/example/ex2.jpg"
                  alt="Template"
                  layout="fill"
                  className="rounded-xl"
                />
              </div>
            </div>
          </>
        )}

        {image && !loading && (
          <div
            className="w-full flex flex-col items-center justify-center mt-12 h-screen"
            id="generatedSection"
          >
            <h1 className="font-sans text-xl font-semibold mb-4 flex items-center">
              Your Generated Image{" "}
              <Sparkles size={15} className="ml-1 text-pink-400" />
            </h1>

            <div className="relative w-full h-auto aspect-square bg-[#202020] rounded-lg motion-preset-pop motion-duration-700">
              <Image
                src={`data:image/png;base64,${image}`}
                alt="Generated Image"
                layout="fill"
                className="rounded-xl"
              />
            </div>

            <div className="flex items-center w-full mt-10 motion-preset-slide-right">
              <Share2Icon className="w-8 h-8" />
              <h1 className="relative left-2 bottom-[-0.1rem] font-sans text-2xl ">
                Save and Share
              </h1>
            </div>

            <div className="w-full flex flex-col items-center justify-center space-y-3 mt-6 motion-preset-slide-right">
              <Button
                className="w-full bg-[#d8d8d8] text-pink-800 rounded-3xl py-5 border border-purple-900 border-[0.15rem] font-sans text-[1rem]"
                onClick={handleDownload}
              >
                Download Image
              </Button>
              <Button className="w-full rounded-3xl py-5 text-white bg-gradient-to-r from-pink-900 to-purple-900 border border-[#d8d8d8] border-[0.03rem] font-sans text-[1rem]">
                Share <Share2Icon className="w-6 h-6 ml-1" />
              </Button>
            </div>

            <div className="w-full flex items-center justify-center space-x-12"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobilePromptSection;
