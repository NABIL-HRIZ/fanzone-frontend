import React from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import './App.css'
import MyNavbar from './componants/myNavbar'
import Login from './auth/Login';
import Register from './auth/Register';
import HeroSection from './componants/HeroSection';
import WhoUs from './componants/WhoUs';
import Faqs from './componants/Faqs';
import Footer from './componants/Footer';
import Politiques from './componants/Politiques';
import Subscibes from './componants/Subscribers';
import ContactUs from './componants/ContactUs';
import About from './componants/About';
import ShowZones from './componants/ShowZones';
import ShowAllZones from './componants/ShowAllZones';
import ZoneDetail from './componants/ZoneDetail';
import CartPage from './componants/CartPage';
import Matches from './pages/Match/Matches';
import MatchReservation from './componants/MatchReservation';
import Success from './componants/Success';
import ShowReservations from './componants/ShowReservations';
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
            <ShowZones />
            <ShowAllZones />
            <About />
            <Subscibes />
         
          </>

                  
        } />
        <Route path='/matches' element={<Matches/>} />
        <Route path='/reservation/:id' element={<MatchReservation />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/success" element={<Success />} />
        <Route path="/mes-réservations" element={<ShowReservations />} />
        <Route path='/qui-sommes-nous' element={<WhoUs />} />
        <Route path='/faq' element={<Faqs/>} />
        <Route path='/politique' element={<Politiques/>} />
        <Route path='/contact' element={<ContactUs/>} />

         <Route path="/zone/:id" element={<ZoneDetail />} />

    </Routes>
    <Footer />
   </Router>
   </>
  )
}

export default App
