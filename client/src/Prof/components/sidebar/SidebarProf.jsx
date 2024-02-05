import "./sidebarProf.scss";
import LineStyleIcon from "@mui/icons-material/LineStyle";
import SchoolIcon from "@mui/icons-material/School";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
// import QueryStatsIcon from "@mui/icons-material/QueryStats";
// import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import DomainIcon from "@mui/icons-material/Domain";
// import SettingsIcon from "@mui/icons-material/Settings";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import OutboxIcon from "@mui/icons-material/Outbox";
import LogoutIcon from "@mui/icons-material/Logout";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const SidebarProf = () => {
  function logout() {
    Cookies.remove("userId");
    Cookies.remove("filId");
    Cookies.remove("role");
    Cookies.remove("auth");
  }
  return (
    <div className="sidebar">
      <div className="top">
        <span className="logo">
          <Link to="/prof/home">
            <img src={require("./download.png")} alt="" />
          </Link>
        </span>
      </div>
      <hr />
      <div className="bottom">
        <ul>
          <p className="title">Principal</p>
          <Link to="/prof/home" style={{ textDecoration: "none" }}>
            <li>
              <LineStyleIcon className="icon" />
              <span>Page d'accueil</span>
            </li>
          </Link>
          <p className="title">Listes</p>
          <Link to="/prof/student" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Étudiants-es</span>
            </li>
          </Link>
          <Link to="/prof/pfe" style={{ textDecoration: "none" }}>
            <li>
              <WorkOutlineIcon className="icon" />
              <span>Mes PFE's</span>
            </li>
          </Link>
          <Link to="/prof/pfeStudent" style={{ textDecoration: "none" }}>
            <li>
              <SchoolIcon className="icon" />
              <span>PFE's et étds-es </span>
            </li>
          </Link>
          <p className="title">Utile</p>
          {/* <li>
            <QueryStatsIcon className="icon" />
            <span>Statistiques</span>
          </li>
          <li>
            <NotificationsActiveIcon className="icon" />
            <span>Notifications</span>
          </li> */}
          <Link to="/prof/demandes" style={{ textDecoration: "none" }}>
            <li>
              <OutboxIcon className="icon" />
              <span>Demandes</span>
            </li>
          </Link>
          <Link to="/prof/domaine" style={{ textDecoration: "none" }}>
            <li>
              <DomainIcon className="icon" />
              <span>Domaines PFE</span>
            </li>
          </Link>
          <Link to="/prof/prerequi" style={{ textDecoration: "none" }}>
            <li>
              <AppRegistrationIcon className="icon" />
              <span>Prérequis</span>
            </li>
          </Link>
          {/* <p className="title">Sevices</p>
          <li>
            <SettingsIcon className="icon" />
            <span>Réglages</span>
          </li> */}
          <p className="title">Utilisateurs</p>
          <Link to="/prof/profile" style={{ textDecoration: "none" }}>
            <li>
              <AccountBoxIcon className="icon" />
              <span>Profile</span>
            </li>
          </Link>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <LogoutIcon className="icon" />
              <span onClick={logout}>Se déconnecter</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default SidebarProf;
