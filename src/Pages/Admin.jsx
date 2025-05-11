import React, { useEffect } from 'react';
import Adminsidebar from '../Components/Adminsidebar';
import { Outlet, useNavigate } from 'react-router-dom';
import { LuLogOut } from "react-icons/lu";
import { logout } from "../Redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { clearUsers } from '../Redux/adminSlice';
import { fetchAllUsers } from '../Redux/adminSlice';
import { fetchAdminUser } from '../Redux/authSlice';

const Admin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users } = useSelector((state) => state.admin);
  const { admin } = useSelector((state) => state.auth);
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    dispatch(clearUsers());
    navigate("/login");
  };
  
  useEffect(() => {
    if(!token) {
      navigate("/login");
      return;
    };
    if (!users || users.length === 0) {
      dispatch(fetchAllUsers());
    }
    if (!admin) {
      dispatch(fetchAdminUser());
    }
  }, [dispatch, navigate, token]);

  return (
    <section className="flex gap-10">
      {/* Sidebar */}
      <Adminsidebar />
        
        {/* Main Content wrapper */}
        <div className="flex-1 relative p-4">
          {/* Logout Icon wrapper */}
          <div className="flex justify-end mb-10">
            <div className="text-center text-white bg-blue-sapphire hover:bg-blue-hover transition duration-[0.4s] ease-in-out p-3 rounded-full">
              <LuLogOut className="text-2xl cursor-pointer" onClick={handleLogout} />
            </div>
          </div>

          {/* Nested Routes Content */}
          <Outlet />
        </div>
    </section>
  )
}

export default Admin;