import React,{ useEffect} from 'react';
import Sidebar from '../Components/Sidebar';
import { Outlet, useNavigate } from 'react-router-dom';
import { LuLogOut } from "react-icons/lu";
import { useDispatch } from "react-redux";
import { logout } from "../Redux/authSlice";
import { fetchUser } from '../Redux/userSlice';
import { clearUser } from '../Redux/userSlice';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token  = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    dispatch(clearUser());
    navigate("/login");
  };
  
  useEffect(() => {
    if(!token) {
      navigate("/login");
      return;
    }
    if (!user) {
      dispatch(fetchUser());
    }
  }, [dispatch, navigate, token, user]);
  return (
    <section className="flex gap-10">
      <Sidebar />

      {/* Main Content wrapper */}
      <div className="flex-1 relative p-4">

        {/* Logout Icon wrapper */}
        <div className="flex justify-end mb-10">
          <div className="text-center text-white bg-blue-sapphire hover:bg-blue-hover transition duration-[0.4s] ease-in-out p-3 rounded-full">
           <LuLogOut className="text-2xl cursor-pointer" onClick={handleLogout}/>
          </div>
        </div>

        {/* Nested Routes Content */}
        <Outlet />
      </div>
    </section>
  )
}

export default Dashboard