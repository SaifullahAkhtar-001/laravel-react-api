import { Routes,Route } from 'react-router-dom'
import Navbar from "./components/Navbar"
import { Home,Login,Register } from './pages'

function App() {
  
  return (
    <div className="">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
    </div>
  )
}

export default App
