import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/Button.css'
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminContent from './pages/Admin/AdminContent';
import AdminZones from './pages/Admin/AdminZones';
import AddZone from './pages/Admin/AddZone';
import MyNavbar from './componants/MyNavbar';
import Footer from './componants/Footer';
import Login from './auth/Login';
import Register from './auth/Register';
import HeroSection from './componants/HeroSection';
import ShowZones from './componants/ShowZones';
import ShowAllZones from './componants/ShowAllZones';
import About from './componants/About';
import Subscibes from './componants/Subscribers';
import Matches from './pages/Match/Matches';
import MatchReservation from './componants/MatchReservation';
import CartPage from './componants/CartPage';
import Success from './componants/Success';
import ShowReservations from './componants/ShowReservations';
import WhoUs from './componants/WhoUs';
import Faqs from './componants/Faqs';
import Politiques from './componants/Politiques';
import ContactUs from './componants/ContactUs';
import ZoneDetail from './componants/ZoneDetail';
import QRScanner from './componants/QRScanner';
import AdminUpdateZone from './pages/Admin/AdminUpdateZone';
import ShowFans from './pages/Admin/ShowFans';
import AddFan from './pages/Admin/AddFan';
import UpdateUser from './pages/Admin/UpdateUser';
import ShowMatches from './pages/Admin/ShowMatches';
import AddMatch from './pages/Admin/AddMatch';
import UpdateMatch from './pages/Admin/UpdateMatch';
import AdminShowReservations from './pages/Admin/AdminShowReservations';
import ReservationDetails from './pages/Admin/ReservationDetails';
import Profile from './componants/Profile';

const App = () => {
  return (
    <Router>
      <Routes>

        <Route path="/admin" element={<AdminDashboard />}>
          <Route index element={<AdminContent />} />        
          <Route path="zones" element={<AdminZones />} />   
          <Route path="zones/add" element={<AddZone />} />  
          <Route path="zones/edit/:id" element={<AdminUpdateZone/>} />  
          <Route path="users" element={<ShowFans />} />  
          <Route path="users/add" element={<AddFan/>} />  
          <Route path="users/edit/:id" element={<UpdateUser/>} />  
          <Route path="matches" element={<ShowMatches />} />  
          <Route path="matches/add" element={<AddMatch/>} />  
          <Route path="matches/edit/:id" element={<UpdateMatch/>} />  
          <Route path="reservations" element={<AdminShowReservations/>} />  
          <Route path="reservation/:id" element={<ReservationDetails/>} />  





          
        
        </Route>

    

        <Route
          path="*"
          element={
            <>
              <MyNavbar />
              <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/' element={
                  <>
                    <HeroSection />
                    <ShowZones />
                    <ShowAllZones />
                    <About />
                    <Subscibes />
                  </>
                } />
                <Route path="/profile" element={<Profile />} />

                <Route path='/matches' element={<Matches />} />
                <Route path='/reservation/:id' element={<MatchReservation />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/success" element={<Success />} />
                <Route path="/mes-réservations" element={<ShowReservations />} />
                <Route path='/qui-sommes-nous' element={<WhoUs />} />
                <Route path='/faq' element={<Faqs />} />
                <Route path='/politique' element={<Politiques />} />
                <Route path='/contact' element={<ContactUs />} />
                <Route path="/zone/:id" element={<ZoneDetail />} />
                <Route path="/agent/add-scan" element={<QRScanner />} />


              </Routes>
              <Footer />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
