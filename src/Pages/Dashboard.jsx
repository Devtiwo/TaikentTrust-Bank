import React from 'react';
import Sidebar from '../Components/Sidebar';
import { Outlet } from 'react-router-dom';
import { LuLogOut } from "react-icons/lu";

const Dashboard = () => {
  return (
    <section className="flex gap-10">
      <Sidebar />

      {/* Main Content wrapper */}
      <div className="flex-1 relative p-4">

        {/* Logout Icon wrapper */}
        <div className="flex justify-end mb-10">
          <div className="text-center text-white bg-blue-sapphire hover:bg-blue-hover transition duration-[0.4s] ease-in-out p-3 rounded-full">
           <LuLogOut className="text-2xl cursor-pointer"/>
          </div>
        </div>

        {/* Nested Routes Content */}
        <Outlet />
      </div>
    </section>
  )
}

export default Dashboard