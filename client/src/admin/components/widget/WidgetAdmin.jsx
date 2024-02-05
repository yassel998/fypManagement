import "./widgetAdmin.scss";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import SchoolIcon from "@mui/icons-material/School";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "axios";

const Widget = ({ type }) => {
  let data;

  //fetch the total number of prof's
  const [numProf, setNumProf] = useState("");
  useEffect(() => {
    let mounted = true;
    Axios.get("http://localhost:3001/numProf").then((response) => {
      if (mounted) {
        setNumProf(response.data[0].num);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  //fetch the total number of chef depss
  const [numChef, setNumChef] = useState("");
  useEffect(() => {
    let mounted = true;
    Axios.get("http://localhost:3001/numChefDep").then((response) => {
      if (mounted) {
        setNumChef(response.data[0].num);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  //fetch the total number of activated student
  const [numStd, setNumStd] = useState("");
  useEffect(() => {
    let mounted = true;
    Axios.get("http://localhost:3001/numStd").then((response) => {
      if (mounted) {
        setNumStd(response.data[0].num);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  switch (type) {
    case "prof":
      data = {
        title: "Professeurs-es",
        link: "Voir tous les professeurs-es",
        go: "/admin/prof",
        number: numProf,
        icon: (
          <SchoolIcon
            className="iconAdminWidget"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "chefDep":
      data = {
        title: "Chef de départements",
        link: "Voir tous les chef de départements",
        go: "/admin/ChefDep",
        number: numChef,
        icon: (
          <BusinessCenterIcon
            className="iconAdminWidget"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "student":
      data = {
        title: "Étudiants-es",
        link: "Voir tous les étudiants-es",
        go: "/admin/studentAct",
        number: numStd,
        icon: (
          <PersonIcon
            className="iconAdminWidget"
            style={{
              backgroundColor: "rgb(249, 249, 189)",
              color: "blue",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }
  return (
    <div className="widget">
      <div className="leftWidget">
        <span className="title">{data.title}</span>
        <span className="counter">{data.number}</span>
        <span className="link">
          <Link to={data.go} style={{ textDecoration: "none" }}>
            {data.link}
          </Link>
        </span>
      </div>
      <div className="rightWidget">{data.icon}</div>
    </div>
  );
};

export default Widget;
