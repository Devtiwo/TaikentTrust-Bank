import React from 'react';
import { info } from './Utilities/footerData';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { slideUp } from './Utilities/animation';

const Footer = () => {
  return (
    <footer>
        <section className="bg-[#E3F4FB] py-5">
          <motion.div
          variants={slideUp(1.5)}
          initial="hidden"
          animate="visible"
          className="container rounded-3xl p-20  bg-slate-600 lg:bg-gradient-to-r from-slate-900 via-[#219dd6] to-blue-sapphire text-white">
            <div className="flex flex-col gap-10 lg:flex-row justify-around mb-10">
              {info.map((items, index) => (
                <div key={index} className="flex gap-5 px-2 lg:p-0 items-center">
                    <div className="bg-white w-[60px] h-[60px] rounded-full flex justify-center items-center">
                      {React.createElement(items.icon, {className: "text-4xl text-black"})}
                    </div>
                    <div>
                      <p className="text-lg font-medium">{items.title}</p>
                      <p className="text-lg font-semibold">{items.paragraph}</p>
                    </div>
                </div>
              ))}
            </div>
            <hr className="mx-5"/>
            <div className="flex flex-col lg:flex-row gap-5 lg:gap-0 justify-around px-20 items-center mb-10 lg:mb-5">
                <div>
                    <img src="/images/taikenttrust2.png" alt="Logo" className="h-[90px] my-5"/>
                    <p className="text-sm w-xs">Secure, fast, and convenient banking at your fingertips. Manage your finances anytime, anywhere with ease. Safe transactions, seamless experience!</p>
                </div>
                <div>
                    <h3 className="text-xl mb-2 font-semibold">Company</h3>
                    <ul className="font-medium">
                        <li className="hover:text-black"><Link to="/">Home</Link></li>
                        <li className="hover:text-black"><Link to="">About Us</Link></li>
                        <li className="hover:text-black"><Link to="">Loans</Link></li>
                        <li className="hover:text-black"><Link to="">Investments</Link></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-xl mb-2 font-semibold">Products</h3>
                    <ul className="font-medium">
                        <li>Deposits</li>
                        <li>Transfers</li>
                        <li>Lending</li>
                        <li>Investments</li>
                    </ul>
                </div>
            </div>
            <hr className="mx-10"/>
            <div className="flex justify-center pt-10">
                <small className="font-medium">© 2025 Taikent Trust Bank. All rights reserved.</small>
            </div>
          </motion.div>
        </section>
    </footer>
  )
}

export default Footer