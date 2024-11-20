"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, CheckCircle2Icon } from "lucide-react";

const UploadSuccessScreen = () => {
  const [base64String, setBase64String] = useState<string | null>(null);
  const [template, setTemplate] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Access localStorage safely only on the client side
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
    console.log("Clicked on back.");
    window.history.back();
    localStorage.removeItem("uploadedFile");
    localStorage.removeItem("template");
  };

  const handleOnClickContinue = () => {
    console.log("Clicked on continue.");
    console.log("Generation Image: ", base64String);
    console.log("Generation Template: ", template);
  };

  return (
    <div className="flex flex-col justify-center">
      <h1 className="mx-12 text-center pt-[1.7rem] text-2xl font-semibold font-sans motion-preset-slide-right">
        Image Uploaded <br />
        Successfully!
      </h1>
      <div className="relative mx-12 aspect-square mt-7 rounded-lg ">
        {/* <Image
          src={base64String}
          alt="Uploaded Image"
          layout="fill"
          objectFit="cover"
          className="rounded-lg z-0 opacity-25 motion-preset-expand motion-duration-300"
        /> */}
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
            Your Image is now ready
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
          className="w-full bg-gradient-to-r from-pink-900 to-purple-900 "
          variant="secondary"
          onClick={handleOnClickContinue}
        >
          Generate <ArrowRightIcon className="w-4 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default UploadSuccessScreen;
