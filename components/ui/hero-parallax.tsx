"use client";
import React, { useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import Image from "next/image";
import { Button } from "./button";

export const HeroParallax = ({
  products,
}: {
  products: {
    thumbnail: string;
  }[];
}) => {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
    springConfig
  );

  const imagesStatic = [
    "/example/img1.png",
    "/example/img.png",
    "/example/img3.png",
    "/example/img4.png",
    "/example/img7.png",
    "/example/img6.png",
    "/example/img7.png",
    "/example/img8.png",
    "/example/img1.png",
    "/example/img.png",
    "/example/img4.png",
    "/example/img7.png",
    "/example/img6.png",
    "/example/img.png",
    "/example/img8.png",
  ];

  // Split products array into rows for display
  const firstRow = imagesStatic.slice(0, 5);
  const secondRow = imagesStatic.slice(5, 10);
  const thirdRow = imagesStatic.slice(10, 15);

  return (
    <div
      ref={ref}
      className="w-screen h-[2600px] py-40 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className=""
      >
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
          {firstRow.map((product, index) => (
            <ProductCard product={product} translate={translateX} key={index} />
          ))}
        </motion.div>
        <motion.div className="flex flex-row mb-20 space-x-20">
          {secondRow.map((product, index) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={index}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
          {thirdRow.map((product, index) => (
            <ProductCard product={product} translate={translateX} key={index} />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Header = () => {
  return (
    <div className="motion-preset-slide-right motion-duration-1500 ml-[7.5vw] relative py-20 md:py-20 px-4 w-full left-0 top-0">
      <h1 className="text-2xl md:text-7xl font-bold dark:text-white">
        The Ultimate Studio for
        <br /> AI Image Generation
      </h1>
      <p className="max-w-2xl text-base md:text-xl mt-8 dark:text-neutral-200">
        Create stunning, custom images with just a few clicks. Enter your
        prompt, customize settings, and let our advanced AI generate
        high-quality visuals instantly. Perfect for designers, developers, and
        creatives looking for fast, tailored results.
      </p>
    </div>
  );
};

export const ProductCard = ({
  product,
  translate,
}: {
  // product: {
  //   thumbnail: string;
  // };
  product: string;
  translate: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      className="group/product h-96 w-[30rem] relative flex-shrink-0"
    >
      <Image
        src={product}
        height="600"
        width="600"
        className="object-cover object-left-top absolute h-full w-full inset-0"
        alt="Image"
      />
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none"></div>
    </motion.div>
  );
};
