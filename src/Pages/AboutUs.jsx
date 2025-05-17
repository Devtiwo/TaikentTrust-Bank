import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

const AboutUs = () => {
  return (
    <>
      <Header />
      <section>
        <div className="container grid grid-cols-1 lg:grid-cols-2 p-10">
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-4xl mb-3 font-semibold text-blue-sapphire">About Us</h1>
              <p className="text-lg/10 font-medium tracking-wider w-full max-w-lg lg:max-w-xl">
              At Taikent Trust Bank, we’re reshaping the way people experience finance in the digital age. We believe that banking should be simple, secure, and accessible to everyone—anytime, anywhere. With a perfect blend of innovation and trust, we offer a platform that empowers individuals and businesses to take full control of their financial lives, effortlessly.
              </p>
            </div>
            <div className="mt-10 mb-10 lg:mb-0 lg:mt-0 flex items-center order-first lg:order-last">
                <img src="/assets/aboutimg.png" alt="About image" className="rounded-2xl"/>
            </div>
        </div>
        <div className="container grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="p-8 bg-blue-sapphire rounded-xl text-white">
            <h2 className="text-3xl font-bold mb-3">01</h2>
            <h3 className="text-3xl mb-3">Our Mission</h3>
            <hr className="mb-5"/>
            <p className="font-medium leading-8">
            Our mission is to empower people through innovative, secure, and user-friendly digital financial solutions. We are committed to eliminating the barriers of traditional banking by creating a seamless experience that’s fast, transparent, and reliable. Whether you're saving, investing, sending money, or managing expenses, Taikent Trust makes it possible—all from the palm of your hand.
            </p>
          </div>
          <div className="p-8 bg-neutral-200 rounded-xl">
            <h2 className="text-3xl font-bold mb-3">02</h2>
            <h3 className="text-3xl mb-3">Our Goals</h3>
            <hr className="mb-5"/>
            <ol className="font-medium list-disc">
              <li className="mb-2"><span className="font-bold">Revolutionize digital banking</span> with intuitive, mobile-first experiences.</li>
              <li className="mb-2"><span className="font-bold">Expand financial access</span> to underserved communities and remote areas.</li>
              <li className="mb-2"><span className="font-bold">Ensure top-tier security</span> with advanced encryption and fraud protection.</li>
              <li className="mb-2"><span className="font-bold">Promote financial literacy</span> through tools, insights, and resources.</li>
              <li className="mb-2"><span className="font-bold">Support businesses and individuals</span> with scalable banking solutions.</li>
            </ol>
          </div>
          <div className="p-8 bg-slate-900 text-white rounded-xl">
            <h2 className="text-3xl mb-3">03</h2>
            <h3 className="text-3xl mb-3">Our Values</h3>
            <hr className="mb-5"/>
            <ol className="list-disc">
              <li className="mb-2"><span className="font-bold">Transparency:</span> We operate with openness and honesty in all our dealings.</li>
              <li className="mb-2"><span className="font-bold">Innovation:</span> We’re constantly pushing the boundaries to improve how banking works.</li>
              <li className="mb-2"><span className="font-bold">Customer-Centricity:</span> You’re at the heart of everything we build.</li>
              <li className="mb-2"><span className="font-bold">Integrity:</span> We uphold the highest standards of ethical behavior and trust.</li>
              <li className="mb-2"><span className="font-bold">Accessibility:</span> We believe financial services should be for everyone, regardless of location or background.</li>
            </ol>
          </div>
        </div>
      </section>
      <Footer />
    </>
    
  )
}

export default AboutUs