import "./widgetProf.scss";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
// import SchoolIcon from "@mui/icons-material/School";
import DomainIcon from "@mui/icons-material/Domain";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "axios";
import Cookies from "js-cookie";

const WidgetProf = ({ type }) => {
  let data;
  const id = Cookies.get("filId");
  const idUser = Cookies.get("userId");

  //fetch the number of students's in filiere
  const [numStd, setNumStd] = useState("");
  useEffect(() => {
    let mounted = true;
    Axios.get(`http://localhost:3001/numStdChedDep/${id}`).then((response) => {
      if (mounted) {
        setNumStd(response.data[0].num);
      }
    });
    return () => {
      mounted = false;
    };
  }, [id]);

  //fetch the number of my pfe's in filiere
  const [numPfe, setNumPfe] = useState("");
  useEffect(() => {
    let mounted = true;
    Axios.get(`http://localhost:3001/numPfeProf/${idUser}`).then((response) => {
      if (mounted) {
        setNumPfe(response.data[0].num);
      }
    });
    return () => {
      mounted = false;
    };
  }, [idUser]);
  numPfe && console.log(numPfe);

  //fetch the number of pfe's in filiere
  const [numDom, setNumDom] = useState("");
  useEffect(() => {
    let mounted = true;
    Axios.get(`http://localhost:3001/numDomaines/${id}`).then((response) => {
      if (mounted) {
        setNumDom(response.data[0].num);
      }
    });
    return () => {
      mounted = false;
    };
  }, [id]);

  switch (type) {
    case "student":
      data = {
        title: "Étudiants-es",
        link: "Voir tous les étudiants-es",
        go: "/prof/student",
        number: numStd,
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "pfe":
      data = {
        title: "PFE's",
        link: "Voir tous les PFE's",
        go: "/prof/pfe",
        number: numPfe,
        icon: (
          <BusinessCenterIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "domaine":
      data = {
        title: "Domaines",
        isMoney: true,
        link: "Voir tous les domaines",
        go: "/prof/domaine",
        number: numDom,
        icon: (
          <DomainIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }
  return (
    <div className="widgetChefDep">
      <div className="leftWidgetChefDep">
        <span className="titleChefDepWidget">{data.title}</span>
        <span className="counterChefDep">{data.number}</span>
        <span className="linkChefDep">
          <Link to={data.go} style={{ textDecoration: "none" }}>
            {data.link}
          </Link>
        </span>
      </div>
      <div className="rightWidgetChefDep">{data.icon}</div>
    </div>
  );
};

export default WidgetProf;
