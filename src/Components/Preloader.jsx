import React from 'react'

const Preloader = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-white">
      <div className="relative w-16 h-16">
        <div className="absolute w-18 h-18 border-2 border-blue-sapphire border-t-transparent rounded-full animate-spin"></div>
        <div className="absolute w-12 h-12 top-3 left-3 border-2 border-blue-hover border-b-transparent rounded-full animate-spin"></div>
        <div className="absolute top-6 left-6 w-6 h-6 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-700 text-sm font-medium absolute top-19 left-2">Loading...</p>
      </div>
    </div>
  )
}

export default Preloader