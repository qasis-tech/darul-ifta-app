import { Outlet, useLocation } from "react-router-dom";
import FooterComponent from "../components/Footer";
import HeaderComponent from "../components/Header";

export default function PublicRouting() {
  const { pathname } = useLocation();
  console.log("location", pathname);
  return (
    <div style={{ backgroundColor: "#f8f9fa" }}>
      {pathname !== "/login" && pathname !== "/admin" && <HeaderComponent />}
      <Outlet />
      {/* <FooterComponent /> */}
    </div>
  );
}
