// React imports
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

// pages & components
import NavBar from './components/NavBar'
import Home from './pages/Home'
import CreateAccount from './pages/CreateAccount'
import Deposit from './pages/Deposit'
import Withdraw from './pages/Withdraw'
import Transfer from './pages/Transfer'
import AllData from './pages/AllData'
import Login from './pages/Login'


export default function App() {

  return (
    <div className='App'>
      <BrowserRouter>
        <NavBar />
        <div className='pages'>
          <Routes>
            <Route index path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/createaccount" element={<CreateAccount />} />
            <Route path="/login" element={<Login />} />
            <Route path="/withdraw" element={<Withdraw />} />
            <Route path="/deposit" element={<Deposit />} />
            <Route path="/transfer" element={<Transfer />} />
            <Route path="/allusers" element={<AllData />} />
          </Routes>
        </div>
      </BrowserRouter >
    </div >
  )
}
