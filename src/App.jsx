import React from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import './App.css'
import MyNavbar from './componants/myNavbar'
import Login from './auth/Login';
import Register from './auth/Register';
import HeroSection from './componants/HeroSection';
import WhoUs from './componants/WhoUs';
import Faqs from './componants/Faqs';
const App = () => {
  return (
   <>
   <Router>
   <MyNavbar />
    <Routes>
    <Route path='/login' element={<Login />} />
    <Route path='/register' element={<Register/>} />
     <Route path='/' element={
          <>
            <HeroSection/>
         
          </>

                  
        } />

        <Route path='/qui-sommes-nous' element={<WhoUs />} />
        <Route path='/faq' element={<Faqs/>} />

    </Routes>
   </Router>
   </>
  )
}

export default App
