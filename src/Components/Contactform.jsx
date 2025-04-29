import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';

const Contactform = () => {
  const formik = useFormik({
    initialValues: {
      fname: "",
      lname: "",
      email: "",
      message: ""
    },
    validationSchema: yup.object({
      fname: yup.string().required("First name is required"),
      lname: yup.string().required("Last name is required"),
      email: yup.string().required("Email is required").email("Enter a valid email"),
      message: yup.string().required("Message is required")
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await axios.post("https://formspree.io/f/mkgrwpeo", values);
        if (response.status === 200) {
          toast.success("Message sent.");
          resetForm();
        }
      } catch (err) {
        toast.error("Error sending message!");
      }
    }
  });
  return (
    <div>
      <form
      autoComplete="off" 
      method="POST" 
      className="bg-blue-bground p-10 w-full rounded-2xl"
      onSubmit={formik.handleSubmit}
      >
        <h1 className="font-medium my-10">Fill out the form below and we'll get back to you as soon as possible</h1>
        {/* First & Last name */}
        <div className="flex gap-5 mb-5">
          <div className="flex flex-col w-full">
            <label htmlFor="fname">First Name</label>
            <input type="text" name="fname" id="fname" 
            placeholder="First Name"
            className="py-2 px-4 border my-2"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.fname}
            />
            <small className="text-red-600">
              {formik.touched.fname && formik.errors.fname}
            </small>
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="lname">Last Name</label>
            <input type="text" name="lname" id="lname" 
            placeholder="Last Name"
            className="py-2 px-4 border my-2"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lname}
            />
            <small className="text-red-600">
              {formik.touched.lname && formik.errors.lname}
            </small>
          </div>
        </div>
        {/* Email section */}
        <div className="flex flex-col w-full mb-5">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" 
          placeholder="Email"
          className="py-2 px-4 border my-2"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          />
          <small className="text-red-600">
            {formik.touched.email && formik.errors.email}
          </small>
        </div>
        {/* Message box section */}
        <div className="flex flex-col w-full mb-10">
          <label htmlFor="message">Message</label>
          <textarea name="message" id="message" 
          placeholder="Tell us what we can help you with"
          className="py-2 px-4 h-32 border my-2"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.message}
          />
          <small className="text-red-600">
            {formik.touched.message && formik.errors.message}
          </small>
        </div>
        {/* Submit button */}
        <div className="text-center">
          <button type="submit"
          className=" border cursor-pointer py-2 px-8 text-white font-semibold rounded-3xl bg-blue-sapphire hover:bg-blue-hover transition duration-[0.5s] ease-in-out"
          >
            Send Message
         </button>
        </div>
      </form>
    </div>
  )
}

export default Contactform