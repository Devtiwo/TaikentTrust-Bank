import React from 'react';
import { feedback } from './Utilities/testimonials';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { slideRight } from './Utilities/animation';

const Testimonial = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  var settings = {
    dots: false,
    arrows: false,
    infinite: true,
    swipe: true,
    autoplay: true,
    speed: 1000,
    slidestoshow: 1,
    slidestoScroll: 1,
    autoplaySpeed: 8000,
    cssEase: "linear"
  }
  return (
    <section className="py-10">
      <motion.div
      ref={ref}
      variants={slideRight(1.3)}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="container relative py-20  rounded-3xl border-2 border-blue-sapphire bg-blue-bground grid grid-cols-1 lg:grid-cols-2 gap-10">
      <img src="../../src/assets/starbg.png" alt="Decorative" className="absolute w-[200px] h-[200px] top-1 lg:top-2 left-2 lg:left-8"/>
      <img src="../../src/assets/starbg.png" alt="Decorative" className="absolute w-[200px] h-[200px] top-210 md:top-170 lg:top-95 right-0 lg:right-0"/>
        <div className="p-10">
            <div className="bg-blue-sapphire w-40 py-2 font-medium mt-5 mb-10 rounded-md">
              <p className="text-center text-white">Testimonials</p>
            </div>
            <div>
                <h3 className="text-5xl font-semibold">What clients say <br /> about us</h3>
                <img src="../../src/assets/trust.png" alt="decorative" className="w-[80px]"/>
            </div>
        </div>
        <div className="pt-20">
            <Slider {...settings}>
              {feedback.map((feeds, index) => (
                <div key={index}>
                <div className="mb-5">
                    <p className="text-xl font-semibold">" {feeds.head} "</p>
                </div>
                <div className="mb-5">
                   <p className="italic">{feeds.text}</p>
                </div>
                <div>
                    <p className="font-medium">--- {feeds.name}</p>
                </div>
                </div>
              ))}
            </Slider>
        </div>
      </motion.div>
    </section>
  )
}

export default Testimonial