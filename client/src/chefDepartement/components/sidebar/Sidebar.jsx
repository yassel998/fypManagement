import "./sidebarChefDep.scss";
import LineStyleIcon from "@mui/icons-material/LineStyle";
import SchoolIcon from "@mui/icons-material/School";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
// import QueryStatsIcon from "@mui/icons-material/QueryStats";
// import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import DomainIcon from "@mui/icons-material/Domain";
// import SettingsIcon from "@mui/icons-material/Settings";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LogoutIcon from "@mui/icons-material/Logout";
import WorkOffIcon from "@mui/icons-material/WorkOff";
import OutboxIcon from "@mui/icons-material/Outbox";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const Sidebar = () => {
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
          <Link to="/chefdepartement/home">
            <img src={require("./download.png")} alt="" />
          </Link>
        </span>
      </div>
      <hr />
      <div className="bottom">
        <ul>
          <p className="title">Principal</p>
          <Link to="/chefdepartement/home" style={{ textDecoration: "none" }}>
            <li>
              <LineStyleIcon className="icon" />
              <span>Page d'accueil</span>
            </li>
          </Link>
          <p className="title">Listes</p>
          <Link to="/chefdepartement/prof" style={{ textDecoration: "none" }}>
            <li>
              <SchoolIcon className="icon" />
              <span>Professeurs-es</span>
            </li>
          </Link>
          <Link
            to="/chefdepartement/student"
            style={{ textDecoration: "none" }}
          >
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Étudiants-es</span>
            </li>
          </Link>
          <Link to="/chefdepartement/myPfe" style={{ textDecoration: "none" }}>
            <li>
              <WorkOutlineIcon className="icon" />
              <span>Mes PFE's</span>
            </li>
          </Link>
          <Link to="/chefdepartement/pfe" style={{ textDecoration: "none" }}>
            <li>
              <WorkOffIcon className="icon" />
              <span>Tous les PFE's</span>
            </li>
          </Link>
          <Link
            to="/chefdepartement/pfeStudent"
            style={{ textDecoration: "none" }}
          >
            <li>
              <SchoolIcon className="icon" />
              <span>PFE's et étds-es </span>
            </li>
          </Link>
          <p className="title">Utile</p>
          {/* <li>
            <QueryStatsIcon className="icon" />
            <span>Statistiques</span>
          </li> */}
          {/* <li>
            <NotificationsActiveIcon className="icon" />
            <span>Notifications</span>
          </li> */}
          <Link
            to="/chefdepartement/demandes"
            style={{ textDecoration: "none" }}
          >
            <li>
              <OutboxIcon className="icon" />
              <span>Demandes</span>
            </li>
          </Link>
          <Link
            to="/chefdepartement/domaine"
            style={{ textDecoration: "none" }}
          >
            <li>
              <DomainIcon className="icon" />
              <span>Domaines PFE</span>
            </li>
          </Link>
          <Link
            to="/chefdepartement/prerequis"
            style={{ textDecoration: "none" }}
          >
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
          <Link
            to="/chefdepartement/profile"
            style={{ textDecoration: "none" }}
          >
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

export default Sidebar;
