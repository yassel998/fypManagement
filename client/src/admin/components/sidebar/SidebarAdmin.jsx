import "./sidebarAdmin.scss";
import LineStyleIcon from "@mui/icons-material/LineStyle";
import SchoolIcon from "@mui/icons-material/School";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import DomainIcon from "@mui/icons-material/Domain";
import PersonIcon from "@mui/icons-material/Person";
// import SettingsIcon from "@mui/icons-material/Settings";
import CreateIcon from "@mui/icons-material/Create";
import LogoutIcon from "@mui/icons-material/Logout";
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
    <div className="sidebarAdmin">
      <div className="topAdmin">
        <span className="logoAdmin">
          <Link to="/admin/home">
            <img src={require("./download.png")} alt="" />
          </Link>
        </span>
      </div>
      <hr />
      <div className="bottomAdmin">
        <ul>
          <p className="titleAdmin">Principal</p>
          <Link to="/admin/home" style={{ textDecoration: "none" }}>
            <li>
              <LineStyleIcon className="iconAdminSidebar" />
              <span>Page d'accueil</span>
            </li>
          </Link>
          <p className="titleAdmin">Listes</p>{" "}
          <Link to="/admin/ChefDep" style={{ textDecoration: "none" }}>
            <li>
              <AccountBalanceIcon className="iconAdminSidebar" />
              <span>Chefs de déps</span>
            </li>
          </Link>
          <Link to="/admin/prof" style={{ textDecoration: "none" }}>
            <li>
              <SchoolIcon className="iconAdminSidebar" />
              <span>Professeurs-es</span>
            </li>
          </Link>
          <Link to="/admin/student" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="iconAdminSidebar" />
              <span>Étudiants-es</span>
            </li>
          </Link>
          <Link to="/admin/studentAct" style={{ textDecoration: "none" }}>
            <li>
              <PersonIcon className="iconAdminSidebar" />
              <span>Étds-es activés</span>
            </li>
          </Link>
          <p className="titleAdmin">Utile</p>
          <Link to="/admin/newAccount" style={{ textDecoration: "none" }}>
            <li>
              <CreateIcon className="iconAdminSidebar" />
              <span>Comptes</span>
            </li>
          </Link>
          <Link to="/admin/newFiliere" style={{ textDecoration: "none" }}>
            <li>
              <DomainIcon className="iconAdminSidebar" />
              <span>Nouvelle filière</span>
            </li>
          </Link>
          {/* <p className="titleAdmin">Sevices</p>
          <li>
            <SettingsIcon className="iconAdminSidebar" />
            <span>Réglages</span>
          </li> */}
          <p className="titleAdmin">Utilisateurs</p>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <LogoutIcon className="iconAdminSidebar" />
              <span onClick={logout}>Se déconnecter</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
