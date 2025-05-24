import React,{ useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { login } from "../Redux/authSlice";
import { toast } from 'react-toastify';
import Preloader from '../Components/Preloader';
import { fetchAdminUser } from '../Redux/authSlice';
import { fetchUser } from '../Redux/userSlice'
 

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, status, user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isLoggedIn || !user?.role) return;
    if (user.role === "admin") {
      navigate("/admin");
    } else if (user.role === "user") {
      navigate("/dashboard");
    }
  }, [isLoggedIn, user, navigate]);

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
      setLoading(true);
      try {
        const result = await dispatch(login(values));
        if (login.fulfilled.match(result)) {
          toast.success(result.payload);
          if (result.payload.user?.role === "admin") {
            await dispatch(fetchAdminUser());
          } else if (result.payload.user?.role === "user") {
            await dispatch(fetchUser());
          }
        } else {
          toast.error(result.payload);
          setLoading(false);
        }
      } catch (err) {
        toast.error(err.message || "Login failed! please try again");
        setLoading(false);
      }
    } 
  });
  return (
    <>
    {loading && <Preloader />}
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-2 h-dvh">
         <div className="flex flex-col items-center justify-center">
            <div>
               <Link to="/"><img src="/images/taikenttrust2.png" alt="logo" className="h-[90px] my-10" /></Link>
            </div>
            <div className="p-2 mb-20">
              <h1 className="text-3xl font-semibold mb-5 text-center">Welcome Back! Please sign In</h1>
              <form className="mt-10 p-5 w-full"
              autoComplete="off"
              method="POST"
              onSubmit={formik.handleSubmit}
              > 
                <div className="flex flex-col mb-2 w-full">
                  <label htmlFor="username" className="mb-2 ml-2 text-sm font-medium">Username</label>
                  <input type="text" id="username" name="username" placeholder="Username"
                  className="py-2 px-4 border-2 border-gray-300 rounded-3xl focus:outline-none"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.username}
                  />
                  <small className="my-2 ml-2 text-red-600">
                    {formik.touched.username && formik.errors.username}
                  </small>
                </div>
                <div className="flex flex-col mb-2 w-full">
                  <label htmlFor="password" className="mb-2 ml-2 text-sm font-medium">Password</label>
                  <input type="password" id="password" name="password" placeholder="Password"
                  className="py-2 px-4 border-2 border-gray-300 rounded-3xl focus:outline-none"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  />
                  <small className="my-2 ml-2 text-red-600">
                    {formik.touched.password && formik.errors.password}
                  </small> 
                </div>
                <div className="mb-10">
                  <Link to="/forgot-password" className="float-right text-sm font-medium hover:text-blue-sapphire">Forgot Password?</Link>
                </div>
                <div className="mt-20">
                    <button type="submit" 
                     className="w-full border cursor-pointer py-2 text-white font-semibold rounded-3xl bg-blue-sapphire hover:bg-blue-hover transition duration-[0.5s] ease-in-out font-bold">
                      {status === "loading" ? "Signing In..." : "Sign in"}
                    </button>
                </div>
              </form>
            </div>
         </div>
         <div className="bg-[#E3F4FB] flex justify-center items-center order-first lg:order-last p-10 lg:p-0">
            <img src="/assets/login.svg" alt="decorative image" className="w-full max-w-lg lg:max-w-2xl"/>
         </div>
      </div>
    </section>
    </>
  )
}

export default Login