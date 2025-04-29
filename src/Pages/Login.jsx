import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { login } from "../Redux/authSlice";
import { toast } from 'react-toastify';
 

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, status, message } = useSelector((state) => state.auth);
  const formik = useFormik({
    initialValues: {
      username: "",
      password: ""
    },
    validationSchema: yup.object({
      username: yup.string().required("Username is required"),
      password: yup.string().required("password is required")
    }),
    onSubmit: async (values) => {
      try {
        const result = await dispatch(login(values)).unwrap();
        if (result.status) {
          toast.success(result);
          navigate("/dashboard");
        }
      } catch (err) {
          toast.error(err);
      }
    } 
  });
  return (
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-2 h-dvh">
         <div className="flex flex-col items-center justify-center">
            <div>
               <Link to="/"><img src="/images/titantrust.png" alt="logo" className="h-[150px]" /></Link>
            </div>
            <div className="p-2 mb-20">
              <h1 className="text-3xl font-semibold mb-5 text-center">Welcome Back! Please sign In</h1>
              <form className="mt-10 p-5 w-full lg:max-w-[90%]"
              autoComplete="off"
              method="POST"
              onSubmit={formik.handleSubmit}
              > 
                <div className="flex flex-col mb-2 w-full">
                  <label htmlFor="username" className="mb-2 font-medium">Username</label>
                  <input type="text" id="username" name="username" placeholder="Username"
                  className="py-2 px-4 border rounded-2xl"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.username}
                  />
                  <small className="my-2 text-red-600">
                    {formik.touched.username && formik.errors.username}
                  </small>
                </div>
                <div className="flex flex-col mb-2 w-full">
                  <label htmlFor="password" className="mb-2 font-medium">Password</label>
                  <input type="password" id="password" name="password" placeholder="Password"
                  className="py-2 px-4 border rounded-2xl"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  />
                  <small className="my-2 text-red-600">
                    {formik.touched.password && formik.errors.password}
                  </small> 
                </div>
                <div className="mb-10">
                  <Link to="/forgot-password" className="float-right text-sm hover:text-blue-sapphire">Forgot Password?</Link>
                </div>
                <div className="mt-20">
                    <button type="submit" className="w-full border cursor-pointer py-2 text-white font-semibold rounded-3xl bg-blue-sapphire hover:bg-blue-hover transition duration-[0.5s] ease-in-out font-bold">Sign In</button>
                </div>
              </form>
            </div>
         </div>
         <div className="bg-[#E3F4FB] flex justify-center items-center order-first lg:order-last p-10 lg:p-0">
            <img src="../../src/assets/login.svg" alt="decorative image" className="w-full max-w-lg lg:max-w-2xl"/>
         </div>
      </div>
    </section>
  )
}

export default Login