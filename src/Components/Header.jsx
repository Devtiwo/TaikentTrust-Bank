import React, { useState } from "react";
import { Link } from "react-router-dom";
import { navMenu } from "./Utilities/menuData";
import { CiMenuFries } from "react-icons/ci";
import MobileMenu from "./MobileMenu";
import { IoClose } from "react-icons/io5";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="h-[110px] bg-white w-full">
      <nav className="flex items-center justify-between px-5 lg:px-10">
        <div>
          <Link to="/">
            <img
              src="/images/taikenttrust2.png"
              alt="logo"
              className="h-[90px] w-[180px] mt-3 lg:ml-5"
            />
          </Link>
        </div>
        <div>
            <ul className="flex items-center gap-5 text-base font-semibold hidden lg:flex">
              {navMenu.sort((a, b) => a.isExternal - b.isExternal).map((item) => (
                <li key={item.id} className="hover:text-blue-sapphire cursor-pointer">
                  {item.isExternal ? (
                   <a href={item.link} target="_blank" rel="noopener noreferrer">{item.title}</a>
                  ) : (
                    <Link to={item.link}>{item.title}</Link>
                 )}
                </li>
              ))}
            </ul>
        </div>
        <div className="hidden lg:flex gap-2">
            <Link to="/login" className="text-blue-sapphire cursor-pointer text-base px-8 py-2 font-medium rounded-lg border-2 border-blue-sapphire transition duration-[0.5s] ease-in-out hover:bg-blue-sapphire hover:text-white">
              Login
            </Link>
        </div>
        <div className="lg:hidden" onClick={() => setIsOpen(!isOpen)}>
           {isOpen ? 
            <IoClose className="text-3xl font-extrabold" />  :  
            <CiMenuFries className="text-3xl font-extrabold" />
           }   
        </div> 
      </nav>
      <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen}/>
    </header>
  );
};

export default Header;