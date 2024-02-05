import { Outlet, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const PrivateRouteProf = () => {
  // let auth = Cookies.get("loggedIn");
  // let auth = false;
  var auth;
  let role = Cookies.get("role");
  if (role == 0) {
    auth = Cookies.get("auth");
  } else {
    auth = false;
  }
  return auth ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRouteProf;
