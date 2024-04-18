import { Route, Routes } from 'react-router-dom'
import Login from "./Components/Login.jsx"
import Home from "./Components/Home.jsx"


function App() {

  return (
  <Routes>
    <Route path="/login" Component={Login} />
    <Route path="/" Component={Home} />
  </Routes>
  
  
  
  )
}

export default App
