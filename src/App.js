import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/Home/Home';


import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login/Login';
import 'bootstrap-icons/font/bootstrap-icons.css'
import Register from './Pages/Register/Register';
import Service from './Pages/Service/Service';
import Shop from './Pages/Shop/Shop';
import ViewHairStyle from './Pages/HairStyle/ViewHairStyle';
import FormBooking from './Components/FormBooking/FormBooking';
import MyProfile from './Pages/MyProfile/MyProfile';
import Booking from './Pages/Booking/Booking';
import ServiceDetails from './Pages/Service/ServiceDetails';
import MyWalet from './Pages/MyProfile/MyWalet';
import VnPay from './Pages/VnPay/VnPay';
import MyHistoryBooking from './Pages/MyProfile/MyHistoryBooking';
import ChangPass from './Pages/MyProfile/ChangPass';
import NotFound from './Pages/NotFound/NotFound.js';
import Footer from './Components/Footer/Footer';
import BookingDetails from './Pages/MyProfile/BookingDetails';
import Rate from './Pages/Rate/Rate';

function Layout() {
  return (
    <div className="main-screen">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/booking" element={<Booking />} />

          <Route path='service' element={<Service />} />
          <Route path='service/:id' element={<ServiceDetails />} />

          <Route path='hair-style' element={<ViewHairStyle />} />

          <Route path='shop' element={<Shop />} />

          <Route path='/my' element={<MyProfile />} />
          <Route path='/my-walet' element={<MyWalet />} />
          <Route path='/my-history' element={<MyHistoryBooking />} />
          <Route path='/my-history/:id' element={<BookingDetails />} />
          <Route path='/change-password' element={<ChangPass />} />

          <Route path='/rate' element={<Rate />} />

          <Route path='/vnpay-return' element={<VnPay />} />
        </Route>
        
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
