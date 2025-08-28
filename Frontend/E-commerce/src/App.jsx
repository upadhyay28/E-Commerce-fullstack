import React from 'react'
import { BrowserRouter , Routes , Route } from 'react-router-dom'
import Navbar from './Nav/Navbar'
import Home from "./Components/Home"
import AddProducts from './Components/AddProducts'
import About from "./Components/About"
import Contact from "./Components/Contact"
import Login from "./Components/Login"
import Cart from "./Components/Cart"
import Profile from "./Components/Profile"

const App = () => {
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
    <Route path='/' element= {<Home/>}/>
    <Route path='/Add Products' element={<AddProducts/>}/>
    <Route path='/About' element={<About/>}/>
    <Route path='/Contact' element={<Contact/>}/>
    <Route path='/Login' element = {<Login/>}/>
    <Route path='/Cart' element={<Cart/>}/>
    <Route path='/Myprofile' element={<Profile/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
