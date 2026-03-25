import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login.jsx'
import './index.css'
import Registrar from './pages/Registrar.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='min-h-screen'>
    <HashRouter>
      <Routes>
        <Route path="/Registrar" element={<Registrar />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </HashRouter>
    </div>
  </StrictMode>,
)