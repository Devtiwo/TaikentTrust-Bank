import React, { useState } from "react";
import { Link } from "react-router-dom";
import { navMenu } from "./Utilities/menuData";
import { CiMenuFries } from "react-icons/ci";
import MobileMenu from "./MobileMenu";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="fixed h-[120px] bg-white w-full">
      <nav className="flex items-center justify-between px-5 lg:px-10">
        <div>
          <Link to="/">
            <img
              src="/images/titantrust.png"
              alt="logo"
              className="h-[150px]"
            />
          </Link>
        </div>
        <div>
            <ul className="flex items-center gap-5 text-base font-semibold hidden lg:flex">
              {navMenu.map((item) => (
                <li key={item.id} className="hover:text-blue-sapphire cursor-pointer">
                 <Link to={item.link}>{item.title}</Link> 
                </li>
              ))}
            </ul>
        </div>
        <div className="hidden lg:flex gap-2">
            <button className="text-white text-base px-4 py-2 font-medium rounded-lg bg-blue-sapphire cursor-pointer hover:bg-blue-hover transition duration-[0.5s] ease-in-out">
                Create An Account
            </button>
            <button className="text-blue-sapphire cursor-pointer text-base px-8 py-2 font-medium rounded-lg border-2 border-blue-sapphire transition duration-[0.5s] ease-in-out hover:bg-blue-sapphire hover:text-white">
              Login
            </button>
        </div>
        <div className="lg:hidden" onClick={() => setIsOpen(!isOpen)}>
        <CiMenuFries className="text-3xl font-extrabold" />
        </div> 
      </nav>
      <MobileMenu isOpen={isOpen}/>
    </header>
  );
};

export default Header;