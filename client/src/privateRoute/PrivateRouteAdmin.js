import { Outlet, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const PrivateRouteAdmin = () => {
  // let auth = Cookies.get("loggedIn");
  // let auth = false;
  var auth;
  let role = Cookies.get("role");
  if (role == 3) {
    auth = Cookies.get("auth");
  } else {
    auth = false;
  }
  return auth ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRouteAdmin;
