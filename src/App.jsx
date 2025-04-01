import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './Pages/Home'
 

function App() {
  return (
    <BrowserRouter>
     <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/home" element={<Navigate to="/" />} />
     </Routes>
    </BrowserRouter>
  )
}

export default App
