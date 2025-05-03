import React from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { baseUrl } from '../Redux/authSlice';

const Signup = () => {
  const formik = useFormik({
    initialValues: {
      fname: '',
      lname: '',
      username: '',
      password: '',
      email: ''
    },
    validationSchema: Yup.object({
      fname: Yup.string().required('First name is required'),
      lname: Yup.string().required('Last name is required'),
      username: Yup.string().required('Username is required'),
      password: Yup.string().required('Password is required').min(10, 'Password must be at least 10 characters long'),
      email: Yup.string().email('Invalid email address').required('Email is required')
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post(`${baseUrl}/admin/register`, values, {
          headers: { Authorization: `Bearer ${token}` } 
        });
        if (response.data.status) {
          toast.success(response.data.message);
          resetForm();
        } else {
          toast.error(response.data.message || 'Error creating account');
        }
      } catch (error) {
        toast.error(error.response?.data?.message || 'Server error! Please try again');
      }
    }
  });
  return (
    <section className="lg:ms-80 h-screen">
      <div>
        <h1 className="text-2xl font-medium">Create An Account</h1>
        <form autoComplete="off" method="POST" 
        className="flex flex-col gap-5 mt-10 p-10 w-full lg:w-3/5"
        onSubmit={formik.handleSubmit}>

          {/* First Name & Last Name*/}
          <div className="flex gap-5">
             <div className="flex flex-col gap-2 w-full">
                 <label htmlFor="fname" className="text-sm font-medium ml-1">First Name</label>
                 <input type="text" id="fname" name="fname" placeholder="Enter first name" 
                 className="border-2 border-gray-300 rounded-3xl px-4 py-2 focus:outline-none"
                 onChange={formik.handleChange} 
                 onBlur={formik.handleBlur}
                 value={formik.values.fname}
                 />
                 <small className="text-red-600 ml-1">{formik.touched.fname && formik.errors.fname}</small>
             </div>
             <div className="flex flex-col gap-2 w-full">
                 <label htmlFor="lname" className="text-sm font-medium ml-1">Last Name</label>
                 <input type="text" id="lname" name="lname" placeholder="Enter last name" 
                 className="border-2 border-gray-300 rounded-3xl px-4 py-2 focus:outline-none"
                 onChange={formik.handleChange}
                 onBlur={formik.handleBlur}
                 value={formik.values.lname}
                 />
                 <small className="text-red-600 ml-1">{formik.touched.lname && formik.errors.lname}</small>
             </div>
          </div>
          
            {/* Username & Password */}
            <div>
             <div className="flex gap-5">
                <div className="flex flex-col gap-2 w-full">
                    <label htmlFor="username" className="text-sm font-medium ml-1">Username</label>
                    <input type="text" id="username" name="username" placeholder="Enter username"
                    className="border-2 border-gray-300 rounded-3xl px-4 py-2 focus:outline-none"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username} 
                    />
                    <small className="text-red-600 ml-1">{formik.touched.username && formik.errors.username}</small>
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <label htmlFor="password" className="text-sm font-medium ml-1">Password</label>
                    <input type="password" id="password" name="password" placeholder="Enter password"
                    className="border-2 border-gray-300 rounded-3xl px-4 py-2 focus:outline-none"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    />
                    <small className="text-red-600 ml-1">{formik.touched.password && formik.errors.password}</small>
                </div>
             </div>
          </div>
          
          {/* Email */}
          <div className="flex flex-col gap-2 w-full">
             <label htmlFor="email" className="text-sm font-medium ml-1">Email</label>
             <input type="email" id="email" name="email" placeholder="Enter email"
             className="border-2 border-gray-300 rounded-3xl px-4 py-2 focus:outline-none"
             onChange={formik.handleChange}
             onBlur={formik.handleBlur}
             value={formik.values.email}
             />
             <small className="text-red-600 ml-1">{formik.touched.email && formik.errors.email}</small>
          </div>
              
          {/* Submit Button */}
            <div className="flex justify-center mt-5">
              <button type="submit" className="bg-blue-sapphire cursor-pointer text-white font-semibold py-2 px-10 rounded-full hover:bg-blue-hover transition duration-300 ease-in-out">Create Account</button>
            </div>
        </form>
      </div>
    </section>
  )
}

export default Signup;