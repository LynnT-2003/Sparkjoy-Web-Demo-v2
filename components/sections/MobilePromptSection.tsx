import { Dices, SendHorizonal, Sparkles } from "lucide-react";
import React from "react";
import { Textarea } from "../ui/textarea";
import Image from "next/image";

const MobilePromptSection = () => {
  return (
    <div className="pb-12">
      <h1 className="pl-14 pt-[1.55rem] text-2xl font-sans font-bold">
        Bring Your Ideas to Life
      </h1>
      <h1 className="pl-14 pt-2 text-2xl font-sans font-bold">
        With High Quality Visuals
      </h1>
      <div className="mx-8">
        <div className="h-[32vh] border border-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 mt-8 rounded-xl">
          <div className="h-full bg-[#191919] rounded-xl p-[2vh] flex flex-col justify-between">
            <div className="h-[22vh]">
              <Textarea
                placeholder={"Enter a Prompt . . ."}
                className="text-md font-sans border-0 hover:border-0 focus:border-0"
              />
            </div>
            <div className="h-[4.5vh] flex items-center rounded-xl mt-auto">
              <div className="h-full ml-2">
                <Dices className="h-full w-auto" />
              </div>
              <div className="flex items-center ml-auto rounded-xl bg-gradient-to-r from-pink-800 to-purple-800 px-5 font-semibold text-md h-full">
                Generate <Sparkles size={18} className="ml-1" />
              </div>
            </div>
          </div>
        </div>

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
      </div>
    </div>
  );
};

export default MobilePromptSection;
