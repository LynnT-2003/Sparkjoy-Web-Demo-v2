import gsap from "gsap";

import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

export const animateWithGsapLeft = (target, animationProps, scrollProps) => {
  gsap.fromTo(
    target,
    {
      x: -100, // Initial position off the left side of the screen
      opacity: 0, // Initial opacity
    },
    {
      ...animationProps, // Additional animation properties
      scrollTrigger: {
        trigger: target,
        toggleActions: "restart reverse restart reverse",
        start: "top 85%",
        ...scrollProps,
      },
    }
  );
};

export const animateWithGsapRight = (target, animationProps, scrollProps) => {
  gsap.fromTo(
    target,
    {
      x: 100, // Initial position off the left side of the screen
      opacity: 0, // Initial opacity
    },
    {
      ...animationProps, // Additional animation properties
      scrollTrigger: {
        trigger: target,
        toggleActions: "restart reverse restart reverse",
        start: "top 85%",
        ...scrollProps,
      },
    }
  );
};

export const animateWithGsapBottom = (target, animationProps, scrollProps) => {
  gsap.fromTo(
    target,
    {
      y: 100, // Initial position off the left side of the screen
      opacity: 0, // Initial opacity
    },
    {
      ...animationProps, // Additional animation properties
      scrollTrigger: {
        trigger: target,
        toggleActions: "restart reverse restart reverse",
        start: "top 85%",
        ...scrollProps,
      },
    }
  );
};
