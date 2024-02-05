import "./sidebarStd.scss";
import LineStyleIcon from "@mui/icons-material/LineStyle";
import SchoolIcon from "@mui/icons-material/School";
import DomainIcon from "@mui/icons-material/Domain";
// import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
// import BorderColorIcon from '@mui/icons-material/BorderColor';
// import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import SendIcon from "@mui/icons-material/Send";
import { Link } from "react-router-dom";

const SidebarStd = () => {
  return (
    <div className="sidebar">
      <div className="top">
        <span className="logo">
          <Link to="/student/home">
            <img src={require("./download.png")} alt="" />
          </Link>
        </span>
      </div>
      <hr />
      <div className="bottom">
        <ul>
          <p className="title">Principal</p>
          <Link to="/student/home" style={{ textDecoration: "none" }}>
            <li>
              <LineStyleIcon className="icon" />
              <span>Page d'accueil</span>
            </li>
          </Link>
          <p className="title">Listes</p>
          <Link to="/student/pfe" style={{ textDecoration: "none" }}>
            <li>
              <SchoolIcon className="icon" />
              <span>PFE's</span>
            </li>
          </Link>
          <p className="title">Utile</p>
          <Link to="/student/mypfe" style={{ textDecoration: "none" }}>
            <li>
              <DomainIcon className="icon" />
              <span>Mon PFE</span>
            </li>
          </Link>
          {/* <Link to="/student/notification" style={{ textDecoration: "none" }}>
            <li>
              <NotificationsActiveIcon className="icon" />
              <span>Notifications</span>
            </li>
          </Link> */}
          <Link to="/student/postul" style={{ textDecoration: "none" }}>
            <li>
              <SendIcon className="icon" />
              <span>Postulations</span>
            </li>
          </Link>
          {/* <Link to="/student/prerequis" style={{ textDecoration: "none" }}>
            <li>
              <BorderColorIcon className="icon" />
              <span>Prérequis</span>
            </li>
          </Link> */}
          {/* <p className="title">Sevices</p>
          <li>
            <SettingsIcon className="icon" />
            <span>Réglages</span>
          </li> */}
          <p className="title">Utilisateurs</p>
          <Link to="/student/profile" style={{ textDecoration: "none" }}>
            <li>
              <PersonIcon className="icon" />
              <span>Profile</span>
            </li>
          </Link>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <LogoutIcon className="icon" />
              <span>Se déconnecter</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default SidebarStd;
