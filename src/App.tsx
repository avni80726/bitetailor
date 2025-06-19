import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Register from './components/Register';
import SignIn from './components/SignIn';
import AppLayout from './components/AppLayout';
import Login from './components/Login';
import Navbar from './components/customers/Navbar';
import DashBoard from './components/customers/CustomerDashboard';
import Onboarding from './components/resturants/Onboarding';
import ResturantRegistration from './components/resturants/ResturantRegistration';
import ResturantDashboard from './components/resturants/ResturantDashboard';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import FoodDetails from './components/resturants/FoodDetails';
import RestaurantNavbar from './components/resturants/RestaurantNavbar';
import ResturantDetails from './components/resturants/ResturantDetails';
import RestaurantCategory from './components/resturants/RestaurantCategory';

function AppContent() {
  const location = useLocation();
  const path = location.pathname;

  // Routes where NO navbar should be shown
  const hideNavbarRoutes = ['/', '/login', '/register', '/signin', '/onboarding'];

  const shouldHideNavbar = hideNavbarRoutes.includes(path);

  // Simple path checks (unsecure)
  const isRestaurantRoute = path.startsWith('/resturant') || path.startsWith('/res');
  const isCustomerRoute = path.startsWith('/customer');

  return (
    <MantineProvider>
      {!shouldHideNavbar && (
        isRestaurantRoute ? <RestaurantNavbar /> :
        isCustomerRoute ? <Navbar /> :
        null
      )}

      <Routes>
        {/* Restaurant Routes */}
        <Route path="/resturant/registration" element={<ResturantRegistration />} />
        <Route path="/resturant/onboard" element={<Onboarding />} />
     
        <Route path="/resturant/fooddetails" element={<FoodDetails />} />
        <Route path="/resdashboard" element={<ResturantDashboard />} />
        <Route path="/resdetails" element={<ResturantDetails />} />
        <Route path="/registration" element={<ResturantRegistration />} />
        <Route path="/fooddetails" element={<FoodDetails />} />
        <Route path="/resnavbar" element={<RestaurantNavbar />} />
          <Route path="/rescategory" element={<RestaurantCategory />} />

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
