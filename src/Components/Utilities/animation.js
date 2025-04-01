import { easeOut } from "framer-motion";

export const slideUp = (delay) => {
  return {
    hidden: {
      opacity: 0,
      y: 100,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: delay,
      },
    },
  };
};

export const slideLeft = () => {
  return {
    hidden: {
      opacity: 0,
      x: 100,
      rotate: 90
    },
    visible: {
      opacity: 1,
      x: 0,
      rotate: 0,
      transition: {
        duration: 1.5,
        delay: 1.2,
        ease: "easeOut"
      },
    },
  };
};

export const slideRight = (delay) => {
  return {
    hidden: {
      opacity: 0,
      x: -100,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1,
        delay: delay,
      },
    },
  };
};
