import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./customers/Navbar";

function AppLayout() {
  const location = useLocation();
  const hideNavbarRoutes = ["/login", "/register","/registration"];

  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <Outlet />
    </>
  );
}

export default AppLayout;
