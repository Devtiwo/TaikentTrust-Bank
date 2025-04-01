import React from 'react'
import { navMenu } from './Utilities/menuData';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { handleClick } from './Utilities/menuData';

const MobileMenu = ({ isOpen, setIsOpen }) => {
  return <AnimatePresence mode="wait">
    {
      isOpen && (
        <motion.div
          initial = {{ opacity: 0, x: -100 }}
          animate = {{ opacity: 1, x: 0 }}
          exit = {{ opacity: 0, x: -100 }}
          transition = {{ duration: 0.4 }}
          className="absolute top-[120px] w-full z-50  px-5"
        >
          <div className="text-2xl text-blue-sapphire bg-neutral-200 font-semibold py-20 rounded-3xl">
            <ul className="flex flex-col gap-10 items-center">
              {navMenu.map((item) => (
                <li key={item.id}><Link to={item.link} onClick={() => handleClick(setIsOpen)}>{item.title}</Link></li>
              ))}
            </ul>
            <div className="flex flex-col items-center !mt-10 gap-10">
            <Link to="/register" className="w-auto text-white text-base px-8 py-4 font-medium rounded-lg bg-blue-sapphire cursor-pointer hover:bg-blue-hover transition duration-[0.5s] ease-in-out">
                Create An Account
            </Link>
            <Link to="/login" className="w-auto text-blue-sapphire cursor-pointer text-base px-8 py-4 font-medium rounded-lg border-2 border-blue-sapphire transition duration-[0.5s] ease-in-out hover:bg-blue-sapphire hover:text-white">
              Login
            </Link>
            </div>
          </div>
        </motion.div>
      )
    }
  </AnimatePresence>
    
  
}

export default MobileMenu