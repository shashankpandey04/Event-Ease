import { Route, Routes } from 'react-router-dom'
import Login from "./Components/Login.jsx"
import ScanQR from './Components/Scanner.jsx'
import Dashboard from './Components/Dashboard.jsx'
import Navbar from './Components/Navbar.jsx'

function App() {

  return (
  <>
  <Navbar />
  <Routes>
    <Route path="/login" Component={Login} />
    <Route path="/" Component={Dashboard} />
    <Route path="/scanner" Component={ScanQR} />
  </Routes>
  </>
  
  
  
  )
}

export default App
