import "./stdPre.scss";
import SidebarStd from "../../components/sidebar/SidebarStd";
import NavbarStudent from "../../components/navbar/NavbarStudent";
import Select from "react-select";
import { useEffect, useState } from "react";
import Axios from "axios";
import Cookies from "js-cookie";

const StdPre = () => {
  const id = Cookies.get("filId");

  //get all the doamines names from the DB
  const [dom, setDom] = useState([]);
  useEffect(() => {
    Axios.get(`http://localhost:3001/prerequisFil/${id}`).then((response) => {
      setDom(response.data);
    });
  }, [id]);

  //push the domaine's id & names in options to pass them to the select
  const optionsDom = [];
  for (let i = 0; i < dom.length; i++) {
    var object = {};
    if (dom.length > 0) {
      object["id"] = dom[i].id_domaine;
      object["value"] = dom[i].id_domaine;
      object["label"] = dom[i].name;
    }
    optionsDom.push(object);
  }

  //add domaine
  const addDomaine = () => {
    Axios.post("http://localhost:3001/addDomaine", {
      idFiliere: id,
    }).then(() => {
      // console.log("success!");
      alert("success!");
    });
  };
  return (
    <div className="new">
      <SidebarStd />
      <div className="newContainer">
        <NavbarStudent />
        <div className="top">
          <h1>Ajouter un nouvel domaine</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              <div className="formInput">
                <label>Listes de vous prérequis</label>
                <Select
                  options={optionsDom}
                  menuPlacement="bottom"
                  className="select"
                />
              </div>
              <div className="formInput">
                <label>Ajouter des nouveaux prérequis</label>
                <Select
                  options={optionsDom}
                  menuPlacement="bottom"
                  className="select"
                />
              </div>
              <button onClick={addDomaine}>Ajouter</button>
            </form>
            {/* <button onClick={addDomaine}>Ajouter</button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StdPre;
