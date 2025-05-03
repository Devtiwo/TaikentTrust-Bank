import React, { useState } from "react";
import { IoIosHome } from "react-icons/io";
import { MdAccountBalance } from "react-icons/md";
import { RiDeleteBin2Line } from "react-icons/ri";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";

import { CiMenuFries } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";

const Adminsidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");

  const handleLink = (link) => {
    setActiveLink(link);
    setIsSidebarOpen(false);
  }
  const adminLinks = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: <IoIosHome className="text-xl mt-1 font-bold" />,
    },
    {
      name: "Create Account",
      path: "/admin/register",
      icon: <MdAccountBalance className="text-xl mt-1 font-bold" />,
    },
    {
      name: "Delete Account",
      path: "/admin/delete",
      icon: <RiDeleteBin2Line className="text-xl mt-1 font-bold" />,
    },
    {
      name: "Update Balance",
      path: "/admin/balance",
      icon: <MdOutlineAccountBalanceWallet className="text-xl mt-1 font-bold" />,
    },
  ];
  return (
    <>
      {/* Mobile toggle button */}
      <div className="fixed lg:hidden top-4 left-4 z-50">
        <button
          className="p-2"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? (
            <IoClose className="text-3xl" />
          ) : (
            <CiMenuFries className="text-3xl font-extrabold" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 bg-blue-bground h-full w-64 p-4 lg:w-72 z-40 lg:border-r lg:border-r-2 lg:border-r-gray-200 transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div>
          <img
            src="/images/titantrust.png"
            alt="Logo"
            className="h-[150px] mx-auto mt-10"
          />
        </div>
        <nav>
          {adminLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`flex justify-center gap-3 font-semibold text-lg my-10 ${
                activeLink === link.path
                  ? "text-white bg-blue-sapphire"
                  : "hover:text-blue-sapphire"
              } px-4 py-2 rounded-full`}
              onClick={() => handleLink(link.path)}
            >
              {link.icon}
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Adminsidebar;
