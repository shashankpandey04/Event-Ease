import { Route, Routes } from 'react-router-dom'
import Login from "./Components/Login.jsx"
import Home from "./Components/Home.jsx"
import ScanQR from './Components/Scanner.jsx'

function App() {

  return (
  <Routes>
    <Route path="/login" Component={Login} />
    <Route path="/" Component={Home} />
    <Route path="/scanner" Component={ScanQR} />
  </Routes>
  
  
  
  )
}

export default App
