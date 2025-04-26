import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';       
import Home from './Pages/Home';
import AboutUs from './Pages/AboutUs';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import Notfound from './Pages/Notfound';
import Forgotpassword from './Pages/Forgotpassword';
import Overview from './Pages/Overview';
import Support from './Pages/Support';
import Preloader from './Components/Preloader';
import Profile from './Pages/Profile';
import Transfer from './Pages/Transfer';
 

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000);
    return () =>  clearTimeout(timer);
  }, []);

  return (
    <>
    <BrowserRouter>
    {loading ? <Preloader /> : 
     <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/home" element={<Navigate to="/" />} />
       <Route path="/about" element={<AboutUs />} />
       <Route path="/login" element={<Login />} />
       <Route path="/forgot-password" element={<Forgotpassword />} />
       <Route path="/dashboard" element={<Dashboard />} >
         <Route path="overview" element={<Overview />} />
         <Route index element={<Overview />} />
         <Route path="transfers" element={<Transfer />} />
         <Route path="support" element={<Support />} />
         <Route path="profile" element={<Profile />} />
       </Route>
       <Route path="*" element={<Notfound />} />
     </Routes>
    }
    </BrowserRouter>
    <ToastContainer position="top-center" theme="colored" hideProgressBar="false" autoClose={5000} />
    </>
  )
}

export default App
