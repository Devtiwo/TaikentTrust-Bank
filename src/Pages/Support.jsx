import React from 'react';
import Contactform from '../Components/Contactform';

const Support = () => {
  return (
    <section className="h-screen lg:ms-80 lg:p-20">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Contact info */}
        <div className="lg:w-1/3 text-center lg:text-left">
          <h1 className="text-4xl font-medium">Get in Touch With us Today</h1>
          <div className="my-10">
             <small className="text-gray-500 font-medium">chat with us</small>
             <p className="text-lg font-medium">info@titantrust.com</p>
          </div>
          <div>
            <small className="text-gray-500 font-medium">mailing address</small>
            <p className="font-medium text-lg">Titan Trust Bank</p>
            <p className="font-medium">P.O. Box 7264 Miami, FL 33126</p>
          </div>
        </div>
        {/* Contact form */}
        <div>
          <Contactform />
        </div>
      </div>
    </section>
  )
}

export default Support