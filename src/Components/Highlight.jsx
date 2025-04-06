import React from "react";
import "../index.css";
import { motion } from "framer-motion";
import { slideLeft, slideRight, slideUp } from "./Utilities/animation";
import { featuresData1, featuresData2 } from "./Utilities/highlightData";
import { useInView } from "react-intersection-observer";

const Highlight = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.001
  });
  return (
    <section className="pb-10 lg:pb-10">
      <motion.div
      ref={ref}
      variants={slideLeft(1.2)}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="bg-neutral-200 w-40 mx-auto py-2 text-center font-medium mt-20 mb-10">
        <h2>Core Features</h2>
      </motion.div>
      <motion.div
      ref={ref}
      variants={slideRight(1.5)}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="mx-auto text-center">
        <h3 className="text-2xl lg:text-4xl lg:w-3xl mx-auto font-bold">
          Highlights of Titan Trust Online Banking Solution
        </h3>
      </motion.div>
      <div className="container grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* Early payment & Expense monitoring section */}

        {featuresData1.map((feature) => (
           <motion.div
           ref={ref}
           variants={slideLeft(1.2)}
           initial="hidden"
           animate={inView ? "visible" : "hidden"}
           key={feature.id} className="p-10 rounded-3xl" style={{ backgroundColor: feature.coverStyle }}>
           <div className="bg-white w-[70px] h-[70px] rounded-full flex mb-5 justify-center items-center">
             {React.createElement(feature.icon, { className: "text-4xl text-center" })}
           </div>
           <div className="mb-20">
              <h3 className="text-3xl font-semibold mb-5">
                {feature.head.split("\n").map((line, index) => (
                  <React.Fragment key={index}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </h3>
              <p className="font-medium">{feature.paragraph}</p>
           </div>
           <div className="flex justify-center">
              <img src={feature.imgSrc} alt="decorative" className="w-full max-w-xs lg:max-w-lg"/>
           </div>
          </motion.div>
        ))}
       </div>

        {/* Transfers, Loans & Investments section */}

      <div className="container grid grid-cols-1 lg:grid-cols-3 gap-5">
         {featuresData2.map((feature) => (
          <motion.div
          ref={ref}
          variants={slideUp(1.7)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
           key={feature.id} style={{ backgroundColor: feature.coverStyle }} className="rounded-3xl p-10">
            <div key={feature.id} className="bg-white w-[70px] h-[70px] rounded-full flex mb-5 justify-center items-center">
                {React.createElement(feature.icon, { className: "text-4xl text-center" })}
            </div>
            <div className="mb-20">
                <h3 className="text-3xl font-semibold mb-5">{feature.head}</h3>
                <p className="font-medium">{feature.paragraph}</p>
            </div>
            <div className="flex justify-center">
                <img src={feature.imgSrc} alt="decorative" className="w-full max-w-xs lg:max-w-lg" />
            </div>
          </motion.div>
         ))}
      </div>
    </section>
  );
};

export default Highlight;
