import React from "react";
import { BiTransfer } from "react-icons/bi";
import { GiTakeMyMoney } from "react-icons/gi";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { slideLeft } from "./Utilities/animation";
import { FcSimCardChip } from "react-icons/fc";
import { SiVisa } from "react-icons/si";

const Dream = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  return (
    <section className="bg-neutral-100 pb-10 lg:pb-20">
      <motion.div
        ref={ref}
        variants={slideLeft(1.5)}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="container grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20"
      >
        <div className="p-10 flex flex-col justify-center mt-10">
          <h2 className="text-5xl font-semibold mb-5">
            Make Your Money <br /> Move Faster
          </h2>
          <p className="font-medium mb-10">
            Our dream is for people to live and work anywhere seamlessly.
            <br />
            That means money without borders: moving it instantly, <br />
            transparently, conveniently, and eventually for free.
          </p>
          <div className="flex flex-row gap-5">
            <div className="flex gap-5">
              <div className="border-2 border-blue-sapphire w-[50px] h-[50px] flex items-center justify-center rounded-xl">
                <BiTransfer className="text-3xl text-blue-sapphire" />
              </div>
              <p className="font-medium">
                <span className="text-2xl font-semibold">7.5M+</span> <br />{" "}
                Daily Transactions
              </p>
            </div>
            <div className="flex gap-5">
              <div className="border-2 border-blue-sapphire w-[50px] h-[50px] flex items-center justify-center rounded-xl">
                <GiTakeMyMoney className="text-3xl text-blue-sapphire" />
              </div>
              <p className="font-medium">
                <span className="text-2xl font-semibold">+3%</span> <br />{" "}
                unlimited Cashback
              </p>
            </div>
          </div>
        </div>
        <div className="">
          <div className="mt-10 lg:mt-20 h-full">
            <div className="w-full lg:w-3/4 mt-5 h-86 rounded-xl bg-gradient-to-tr from-black via-gray-900 to-gray-400 text-white p-6 shadow-lg relative overflow-hidden">
              {/* Decorative circles */}
              <div className="absolute top-0 left-0 w-full h-full opacity-10">
                <div className="absolute w-64 h-64 rounded-full bg-white -top-20 -left-20" />
                <div className="absolute w-40 h-40 rounded-full bg-white -bottom-10 right-10" />
              </div>
              {/* Chip + Bank logo */}
              <div className="flex">
                <FcSimCardChip className="text-6xl" />
                <img
                  src="/images/taikenttrust2.png"
                  alt="logo"
                  className="mx-auto mt-14 "
                />
              </div>
              {/* Balance + card type */}
              <div className="mt-15 flex justify-between">
                <div>
                  <SiVisa className="text-5xl mt-2 " />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Dream;
