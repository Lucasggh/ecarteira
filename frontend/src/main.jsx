import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter,  Route, Routes } from 'react-router-dom'
import Login from './pages/Login.jsx'
import './index.css'
import Registrar from './pages/Registrar.jsx'
import ProtectedRoute from './Components/ProtectedRoute.jsx'
import Home from './pages/Home.jsx'
import Transactions from './pages/Transactions.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='min-h-screen'>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Registrar />} />
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute/>}>
            <Route path="/home" element={<Home />} />
            <Route path="/transactions" element={<Transactions/>}/>
        </Route>


      </Routes>
    </HashRouter>
    </div>
  </StrictMode>,
)