import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { baseUrl } from '../Redux/authSlice';
import { toast } from 'react-toastify';


const Resetpassword = () => {
  const { token } = useParams();
  const navigate = useNavigate(); 

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmpass: ""
    },
    validationSchema: yup.object({
      password: yup.string().required("password is required").min(10, "Password must be 10 characters long"),
      confirmpass: yup.string().required("Confirm new password").oneOf([yup.ref("password"), null], "Passwords do not match")
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await axios.post(`${baseUrl}/auth/reset-password/${token}`, values);
        if (response.data.status) {
          toast.success(response.data.message);
          resetForm();
          navigate("/login");
        }
      } catch (err) {
        toast.error(err.response?.data?.message || "Server error! Please try again.");
      }
    }
  });
  return (
    <section className="h-screen bg-blue-bground">
      <div>
        <div className="w-[190px]">
          <Link to="/"><img src="/images/taikenttrust2.png" alt="logo" className="h-[150px] lg:pl-10 " /></Link>
        </div>
        <div className="container text-center">
            <h1 className="text-4xl font-semibold mb-5">Change Password</h1>
            <p className="font-medium">Provide a new password for your account</p>
        </div>
        <div className="w-full lg:w-[35%] p-5 mx-auto">
            <form className="w-full p-5" autoComplete="off" method="POST" onSubmit={formik.handleSubmit}>
              <div className="flex flex-col mb-2 mx-auto">
                <label htmlFor="password" className="mb-3 font-medium text-sm ml-2">password</label>
                <input type="password" 
                id="password" 
                name="password" 
                placeholder="Password" 
                className="py-2 px-4 border-2 border-gray-300 focus:outline-none rounded-3xl"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                />
                <small className="my-2 ml-2 text-red-600">{formik.touched.password && formik.errors.password}</small>
              </div>
              <div className="flex flex-col mb-2 mx-auto">
                <label htmlFor="confirmpass" className="mb-3 font-medium text-sm ml-2">confirm password</label>
                <input type="password" 
                id="confirmpass" 
                name="confirmpass" 
                placeholder="Confirm Password" 
                className="py-2 px-4 border-2 border-gray-300 focus:outline-none rounded-3xl"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmpass}
                />
                <small className="my-2 ml-2 text-red-600">{formik.touched.confirmpass && formik.errors.confirmpass}</small>
              </div>
              <div className="mt-10 text-center">
                <button type="submit" className="border cursor-pointer px-6 py-3 text-white font-semibold rounded-3xl bg-blue-sapphire hover:bg-blue-hover transition duration-[0.5s] ease-in-out">Reset Password</button>
              </div>
            </form>
        </div>
      </div>
    </section>
  )
}

export default Resetpassword;