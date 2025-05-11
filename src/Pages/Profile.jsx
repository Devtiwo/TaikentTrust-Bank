import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { baseUrl } from '../Redux/authSlice';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';


const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const formik = useFormik({
    initialValues: {
      currentpass: "",
      newpass: "",
      confirmpass: ""
    },
    validationSchema: yup.object({
      currentpass: yup.string().required("Current password is required"),
      newpass: yup.string().required("New password is required").min(10, "Password must be 10 characters long"),
      confirmpass: yup.string().required("Confirm new password").oneOf([yup.ref("newpass"), null], "Passwords do not match")
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.patch(`${baseUrl}/user/change-password`, values, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.data.status) {
          toast.success(response.data.message);
          resetForm();
        } else {
          toast.error(response.data.message || "Error changing password");
        }
      } catch (err) {
        toast.error(err.response?.data?.message || "server error! pls try again");
      }
    }
  });
  return (
    <section className="h-screen lg:ms-94 lg:mt-30">
      <div className="flex gap-5">
         {/* Name initials */}
        <div className="w-24 h-24 flex justify-center items-center rounded-full border-2 border-blue-hover font-semibold text-white bg-blue-sapphire">
          <h1 className="text-5xl">
            {user?.fname.charAt(0).toUpperCase()}{user?.lname.charAt(0).toUpperCase()}
          </h1>
        </div>
         {/* Full name & Email */}
        <div className="flex flex-col justify-center font-medium">
          <h1 className="text-2xl">{user?.fname} {user?.lname}</h1>
          <p className="text-sm">{user?.email}</p>
        </div>
      </div>
      {/* Change password form */}
      <div className="mt-10">
        <h1 className="text-3xl font-medium">Change Password</h1>
        <div className="mt-20">
          <form autoComplete="off" method="POST" className="w-full lg:w-2/5 p-5" onSubmit={formik.handleSubmit} >
            <div className="flex flex-col mb-5">
              <label htmlFor="currentpass" className="ml-2 text-sm font-medium">Current password</label>
              <input type="password" id="currentpass" name="currentpass" 
              placeholder="Enter your current password"
              className="px-4 py-2 my-2 border-2 border-gray-300 focus:outline-none rounded-3xl"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.currentpass}
              />
              <small className="text-red-600 ml-2">{formik.touched.currentpass && formik.errors.currentpass}</small>
            </div>
            <div className="flex flex-col mb-5">
              <label htmlFor="newpass" className="ml-2 text-sm font-medium">New password</label>
              <input type="password" id="newpass" name="newpass" 
              placeholder="Enter your new password"
              className="px-4 py-2 my-2 border-2 border-gray-300 focus:outline-none rounded-3xl"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.newpass}
              />
              <small className="text-red-600 ml-2">{formik.touched.newpass && formik.errors.newpass}</small>
            </div>
            <div className="flex flex-col mb-10">
              <label htmlFor="confirmpass" className="ml-2 text-sm font-medium">Confirm password</label>
              <input type="password" id="confirmpass" name="confirmpass" 
              placeholder="Confirm new password"
              className="px-4 py-2 my-2 border-2 border-gray-300 focus:outline-none rounded-3xl"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmpass}
              />
              <small className="text-red-600 ml-2">{formik.touched.confirmpass && formik.errors.confirmpass}</small>
            </div>
            <div>
              <button type="submit" className="cursor-pointer px-8 py-2 text-white font-semibold rounded-3xl bg-blue-sapphire hover:bg-blue-hover transition duration-[0.5s] ease-in-out font-bold">Change password</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Profile