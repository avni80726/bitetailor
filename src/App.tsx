import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate, } from 'react-router-dom';
import Register from './components/Register';
import { Notifications, showNotification } from '@mantine/notifications'; import SignIn from './components/SignIn';
import AppLayout from './components/AppLayout';
import Login from './components/Login';
import Navbar from './components/customers/Navbar';
import DashBoard from './components/customers/CustomerDashboard';
import Onboarding from './components/resturants/Onboarding';
import ResturantRegistration from './components/resturants/ResturantRegistration';
import ResturantDashboard from './components/resturants/ResturantDashboard';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import RestaurantNavbar from './components/resturants/RestaurantNavbar';
import ResturantDetails from './components/resturants/ResturantDetails';
import RestaurantCategory from './components/resturants/RestaurantCategory';
import { useEffect } from 'react';
import axios from 'axios';

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  const isAuth = !!localStorage.getItem('token');

  const protectedRoutes = [
    '/resdashboard',
    '/resdetails',
    '/fooddetails',
    '/rescategory',
  ];

  // Routes where NO navbar should be shown
  const hideNavbarRoutes = ['/', '/login', '/register', '/signin', '/onboarding'];

  const shouldHideNavbar = hideNavbarRoutes.includes(path);

  // Simple path checks (unsecure)
  const isRestaurantRoute = path.startsWith('/resturant') || path.startsWith('/res');
  const isCustomerRoute = path.startsWith('/customer');

  useEffect(() => {
    if (protectedRoutes.includes(path) && !isAuth) {
      alert("Please login to continue.");
      navigate('/login');
    }
  }, [path, isAuth, navigate]);


  // AXIOS INTERCEPTOR
  axios.interceptors.request.use(
    (config) => {
      console.log("Request Intercepted!!!");
      const token = localStorage.getItem('token');
      if (config.url?.includes("auth")) {

      } else {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }


      return config;
    },
    (error) => Promise.reject(error)
  );

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        console.warn('Unauthorized: Redirecting to login...');

        showNotification({
          title: 'Session Expired',
          message: 'Please login again to continue.',
          color: 'red',
        });

        localStorage.removeItem('token');

         setTimeout(() => {
        navigate('/login');
      }, 500); 
    
      }
      return Promise.reject(error);
    }
  );


  return (
    <MantineProvider>
      <Notifications position='top-right' />
      {!shouldHideNavbar && (
        isRestaurantRoute ? <RestaurantNavbar /> :
          isCustomerRoute ? <Navbar /> :
            null
      )}

      <Routes>
        {/* Restaurant Routes */}
        <Route path="/resturant/registration" element={<ResturantRegistration />} />
        <Route path="/" element={<ResturantRegistration />} />
        <Route path="/resturant/onboard" element={<Onboarding />} />
        <Route path="/resturant/details" element={<ResturantDetails />} />
        <Route path="/resdashboard" element={<ResturantDashboard />} />
        <Route path="/resdetails" element={<ResturantDetails />} />
        <Route path="/registration" element={<ResturantRegistration />} />
        <Route path="/resnavbar" element={<RestaurantNavbar />} />
        <Route path="/rescategory" element={<RestaurantCategory />} />
        <Route path="//" element={<ResturantDetails />} />

        {/* Customer Routes */}
        <Route path="/customer/dashboard" element={<DashBoard />} />

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/navbar" element={<Navbar />} />

        {/* Misc */}
        <Route path="/onboarding" element={<Onboarding />} />
        <Route element={<AppLayout />} />
        {

        }
      </Routes>

    </MantineProvider>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
