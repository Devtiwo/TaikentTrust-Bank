import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';       
import Home from './Pages/Home';
import AboutUs from './Pages/AboutUs';
import Login from './Components/Login';
import Dashboard from './Pages/Dashboard';
import Notfound from './Pages/Notfound';
 

function App() {
  return (
    <>
    <BrowserRouter>
     <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/home" element={<Navigate to="/" />} />
       <Route path="/about" element={<AboutUs />} />
       <Route path="/login" element={<Login />} />
       <Route path="/dashboard" element={<Dashboard />} />
       <Route path="*" element={<Notfound />} />
     </Routes>
    </BrowserRouter>
    <ToastContainer position="top-center" theme="colored" hideProgressBar="false" autoClose={5000} />
    </>
  )
}

export default App
