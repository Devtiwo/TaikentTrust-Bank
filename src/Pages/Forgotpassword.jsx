import React from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { baseUrl } from '../Redux/authSlice';
import { toast } from 'react-toastify';

const Forgotpassword = () => {
  const formik = useFormik({
    initialValues: {
      email: ""
    },
    validationSchema: yup.object({
      email: yup.string().required("Email is required").email("Enter a valid email")
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await axios.post(`${baseUrl}/auth/forgot-password`, values);
        if (response.data.status) {
          toast.success(response.data.message);
          resetForm();
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
          <Link to="/"><img src="/images/taikenttrust2.png" alt="logo" className="h-[90px] w-[180px]-10 mt-5 ml-5 lg:ml-20" /></Link>
        </div>
        <div className="container text-center">
            <h1 className="text-4xl font-semibold mb-5">Reset Your Password</h1>
            <p className="font-medium">Enter your registered email to receive password reset link</p>
        </div>
        <div className="w-full lg:w-[35%] p-5 mx-auto">
            <form className="w-full p-5" autoComplete="off" method="POST" onSubmit={formik.handleSubmit}>
              <div className="flex flex-col mb-2 mx-auto">
                <label htmlFor="email" className="mb-3 font-medium text-sm ml-2">Email</label>
                <input type="email" 
                id="email" 
                name="email" 
                placeholder="Email Address" 
                className="py-2 px-4 border-2 border-gray-300 focus:outline-none rounded-3xl"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                />
                <small className="my-2 ml-2 text-red-600">{formik.touched.email && formik.errors.email}</small>
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

export default Forgotpassword