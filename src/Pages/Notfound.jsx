import React from 'react';
import { Link } from 'react-router-dom';

const Notfound = () => {
  return (
    <section className="h-screen">
      <div className="container p-5">
        <div>
          <img src="/assets/4041.png" alt="notfound image" className="mx-auto" />
        </div>
        <div>
          <div className="w-full lg:max-w-5xl mx-auto my-5">
             <h1 className="text-2xl text-center">OOPS! The Page you are looking for might have been removed, had it's name changed or is temporarily Unavailable</h1>
          </div>
          <div className="w-sm mx-auto my-10 text-center">
             <Link to="/" className="text-lg text-white font-medium px-8 py-4 font-semibold rounded-lg bg-blue-sapphire cursor-pointer hover:bg-blue-hover transition duration-[0.5s] ease-in-out">Go Back</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Notfound