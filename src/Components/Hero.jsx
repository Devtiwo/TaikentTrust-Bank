import React from 'react'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { slideLeftRotate, slideRight } from './Utilities/animation';

const Hero = () => {
  return (
    <>
      <section className="relative">
        <div className="relative">
            <img src="../../src/assets/starbg.png" alt="Decorative" className="absolute w-xs lg:w-sm  top-1 lg:top-2 left-2 lg:left-8"/>
            <img src="../../src/assets/starbg.png" alt="Decorative" className="absolute w-xs lg:w-sm  left-0 lg:left-180 top-70 lg:top-120"/>
            <img src="../../src/assets/3star.png" alt="Decorative" className="absolute w-2xs lg:w-sm top-90 right-0"/>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 top-[120px] min-h-[700px]">
          <div className="bg-blue-bground flex flex-col justify-center  py-20 px-5 lg:px-40 text-center lg:text-left lg:max-w-[1200px]">
            <motion.h1
            variants={slideRight(0.6)}
            initial="hidden"
            animate="visible"
            className="text-5xl font-bold leading-[1.5] !mb-5">Bank Smarter, Faster, Safer - Anywhere, Anytime!</motion.h1>
            <motion.p
            variants={slideRight(1.2)}
            initial="hidden"
            animate="visible" 
            className="font-medium lg:max-w-[550px]">Experience seamless banking with secure transactions, easy account management, and smart financial tools—all designed to fit your lifestyle.</motion.p>
            <motion.div
            variants={slideRight(1.5)}
            initial="hidden"
            animate="visible" 
            className="!mt-10">
            <Link to="/register" className="!mt-5 max-w-[150px] self-center lg:self-start text-white text-center text-base px-8 py-4 font-semibold rounded-lg bg-blue-sapphire cursor-pointer hover:bg-blue-hover transition duration-[0.5s] ease-in-out">
              Join Us
            </Link>
            </motion.div>
          </div>
          <div className="flex item-center justify-center pt-10">
            <motion.img
            variants={slideLeftRotate()}
            initial="hidden"
            animate="visible"
            src="../../src/assets/heroimg.png" alt="hero image" className="lg:w-[600px]"/>
          </div>
        </div>
      </section>
    </>
  )
}

export default Hero