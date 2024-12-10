"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, CheckCircle2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { User } from "firebase/auth";
import { onAuthStateChange } from "@/lib/firebase";
import { buildRequestBody } from "@/lib/apiServices/imageGeneration";

const UploadSuccessScreen = () => {
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
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [base64String, setBase64String] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [template, setTemplate] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedFile = localStorage.getItem("uploadedFile");
      const storedTemplate = localStorage.getItem("template");
      setBase64String(storedFile);
      setTemplate(storedTemplate);
    }
  }, []);

  if (!base64String) {
    return <div>No file found.</div>;
  }

  const handleOnClickGoBack = () => {
    window.history.back();
    localStorage.removeItem("uploadedFile");
    localStorage.removeItem("template");
  };

  const handleOnClickContinue = async () => {
    console.log("Clicked on continue.");
    setLoading(true);

    const trimmedBased64String = base64String.replace(
      /^data:image\/\w+;base64,/,
      ""
    );

    console.log("Trimmed base64 string:", trimmedBased64String);

    // const body = {
    //   input: {
    //     workflow: {
    //       "6": {
    //         inputs: {
    //           text: "A portrait of a man in ufotable-style fantasy whose ethereal magic style blends traditional holiday symbols with supernatural radiance. Their movements create spiral of golden light, brought to life through ufotable's signature dynamic animation. In the background, there are Christmas Trees.",
    //           clip: ["11", 0],
    //         },
    //         class_type: "CLIPTextEncode",
    //       },
    //       "8": {
    //         inputs: {
    //           samples: ["13", 0],
    //           vae: ["10", 0],
    //         },
    //         class_type: "VAEDecode",
    //       },
    //       "9": {
    //         inputs: {
    //           filename_prefix: "ComfyUI",
    //           images: ["8", 0],
    //         },
    //         class_type: "SaveImage",
    //       },
    //       "10": {
    //         inputs: {
    //           vae_name: "ae.safetensors",
    //         },
    //         class_type: "VAELoader",
    //       },
    //       "11": {
    //         inputs: {
    //           clip_name1: "t5xxl_fp8_e4m3fn.safetensors",
    //           clip_name2: "clip_l.safetensors",
    //           type: "flux",
    //         },
    //         class_type: "DualCLIPLoader",
    //       },
    //       "12": {
    //         inputs: {
    //           unet_name: "flux1-dev.safetensors",
    //           weight_dtype: "fp8_e4m3fn",
    //         },
    //         class_type: "UNETLoader",
    //       },
    //       "13": {
    //         inputs: {
    //           noise: ["25", 0],
    //           guider: ["22", 0],
    //           sampler: ["16", 0],
    //           sigmas: ["17", 0],
    //           latent_image: ["27", 0],
    //         },
    //         class_type: "SamplerCustomAdvanced",
    //       },
    //       "16": {
    //         inputs: {
    //           sampler_name: "euler",
    //         },
    //         class_type: "KSamplerSelect",
    //       },
    //       "17": {
    //         inputs: {
    //           scheduler: "beta",
    //           steps: 20,
    //           denoise: 1,
    //           model: ["30", 0],
    //         },
    //         class_type: "BasicScheduler",
    //       },
    //       "22": {
    //         inputs: {
    //           model: ["12", 0],
    //           conditioning: ["49", 0],
    //         },
    //         class_type: "BasicGuider",
    //       },
    //       "25": {
    //         inputs: {
    //           noise_seed: Math.floor(Math.random() * 99999) + 1,
    //         },
    //         class_type: "RandomNoise",
    //       },
    //       "26": {
    //         inputs: {
    //           guidance: 3.5,
    //           conditioning: ["6", 0],
    //         },
    //         class_type: "FluxGuidance",
    //       },
    //       "27": {
    //         inputs: {
    //           width: 1024,
    //           height: 1024,
    //           batch_size: 1,
    //         },
    //         class_type: "EmptySD3LatentImage",
    //       },
    //       "30": {
    //         inputs: {
    //           max_shift: 1.15,
    //           base_shift: 0.5,
    //           width: 1024,
    //           height: 1024,
    //           model: ["12", 0],
    //         },
    //         class_type: "ModelSamplingFlux",
    //       },
    //       "38": {
    //         inputs: {
    //           clip_name: "sigclip_vision_patch14_384.safetensors",
    //         },
    //         class_type: "CLIPVisionLoader",
    //       },
    //       "39": {
    //         inputs: {
    //           clip_vision: ["38", 0],
    //           image: ["52", 0],
    //         },
    //         class_type: "CLIPVisionEncode",
    //       },
    //       "40": {
    //         inputs: {
    //           image: "current.jpg",
    //           upload: "image",
    //         },
    //         class_type: "LoadImage",
    //       },
    //       "42": {
    //         inputs: {
    //           style_model_name: "flux1-redux-dev.safetensors",
    //         },
    //         class_type: "StyleModelLoader",
    //       },
    //       "45": {
    //         inputs: {
    //           image_strength: "medium",
    //           conditioning: ["26", 0],
    //           style_model: ["42", 0],
    //           clip_vision_output: ["39", 0],
    //         },
    //         class_type: "StyleModelApplySimple",
    //       },
    //       "49": {
    //         inputs: {
    //           image_strength: "medium",
    //           conditioning: ["45", 0],
    //           style_model: ["42", 0],
    //           clip_vision_output: ["50", 0],
    //         },
    //         class_type: "StyleModelApplySimple",
    //       },
    //       "50": {
    //         inputs: {
    //           clip_vision: ["38", 0],
    //           image: ["51", 0],
    //         },
    //         class_type: "CLIPVisionEncode",
    //       },
    //       "51": {
    //         inputs: {
    //           image: "ChrismasSuit.png",
    //           upload: "image",
    //         },
    //         class_type: "LoadImage",
    //       },
    //       "52": {
    //         inputs: {
    //           width: 1024,
    //           height: 1024,
    //           upscale_method: "nearest-exact",
    //           keep_proportion: false,
    //           divisible_by: 2,
    //           crop: "disabled",
    //           image: ["40", 0],
    //         },
    //         class_type: "ImageResizeKJ",
    //       },
    //     },
    //     images: [
    //       {
    //         name: "current.jpg",
    //         image: trimmedBased64String,
    //       },
    //     ],
    //   },
    // };

    const body = buildRequestBody(trimmedBased64String);
    console.log("Body:", body);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_RUNPOD_SERVERLESS_ENDPOINT_2}`,
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
      setGeneratedImage(data.output.message);

      if (!user) {
        console.log(
          "User is not logged in. Skipping image save to both Cloudinary and MongoDB..."
        );
      }

      if (data.output.message && user) {
        const base64Image = data.output.message;
        console.log("User is logged in. Saving...");
        const cloudinaryResponse = await fetch("/api/upload-to-cloudinary", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ base64Image: base64Image }),
        });
        const cloudinaryData = await cloudinaryResponse.json();
        console.log("Cloudinary URL:", cloudinaryData.url);

        if (cloudinaryData.url) {
          // Save the response to MongoDB
          const mongoBody = {
            delayTime: data.delayTime,
            executionTime: data.executionTime,
            image: cloudinaryData.url,
            prompt: "PrismaForge Special - Mystical Christmas Themed Portrait.",
            userId: user?.uid,
            username: user?.displayName,
          };

          // // console.log("Lets post to MongoDB later:", data);
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
      console.error("Failed to generate image.", error);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col justify-center">
      {!generatedImage && !loading && (
        <div>
          <h1 className="mx-12 text-center pt-[1.7rem] text-2xl font-semibold font-sans motion-preset-slide-right">
            Image Uploaded <br />
            Successfully!
          </h1>
          <div className="relative mx-12 aspect-square mt-7 rounded-lg ">
            <img
              src={base64String}
              className="w-full aspect-square rounded-lg opacity-25 object-cover motion-preset-expand motion-duration-300"
            />
            <div className="w-[80%] h-[80%] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center justify-center">
              <CheckCircle2Icon
                className="w-[40%] h-[40%] text-green-500 motion-preset-pop motion-duration-1000"
                style={{
                  transformOrigin: "center",
                }}
              />
              <h1 className="text-center pt-4 text-md font-semibold font-sans opacity-100 motion-preset-expand motion-duration-300">
                Your new Image ready
              </h1>
              <h1 className="text-center pt-0 text-md font-semibold font-sans opacity-100 motion-preset-expand motion-duration-300">
                to be generated.
              </h1>
            </div>
          </div>

          <div className="flex mx-12 mt-7 items-center justify-between space-x-4">
            <Button
              className="w-full"
              variant="default"
              onClick={handleOnClickGoBack}
            >
              Go Back
            </Button>
            <Button
              className="w-full bg-gradient-to-r from-pink-900 to-purple-900"
              variant="secondary"
              onClick={handleOnClickContinue}
            >
              Continue <ArrowRightIcon className="w-4 h-5 ml-2" />
            </Button>
          </div>
        </div>
      )}

      {loading && (
        <div className="w-full flex flex-col items-center justify-center h-full pt-[1.7rem]">
          <h1 className="mb-6 mx-auto text-center animate-pulse font-semibold font-sans text-lg">
            Generating your image..
          </h1>
          {/* <h1>Hang on tight! This usually takes a few seconds.</h1> */}
          <div className="w-[60%] bg-gray-100 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full animate-pulse"
              style={{ width: "100%" }}
            />
          </div>
        </div>
      )}

      {generatedImage && !loading && (
        <div className="">
          <h1 className="mx-12 pt-[1.7rem] text-center text-2xl font-semibold font-sans motion-preset-slide-right">
            Image Generated!
          </h1>
          <div className="relative mx-12 aspect-square mt-7 rounded-lg">
            <img
              src={`data:image/png;base64,${generatedImage}`} // Update the format if needed
              className="w-full aspect-square rounded-lg object-cover motion-preset-expand motion-duration-500"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadSuccessScreen;
