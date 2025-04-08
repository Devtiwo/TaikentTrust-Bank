import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './Pages/Home'
import AboutUs from './Pages/AboutUs'
 

function App() {
  return (
    <BrowserRouter>
     <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/home" element={<Navigate to="/" />} />
       <Route path="/about" element={<AboutUs />} />
     </Routes>
    </BrowserRouter>
  )
}

export default App
