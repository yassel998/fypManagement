import "./newFiliere.scss";
import SidebarAdmin from "../../components/sidebar/SidebarAdmin";
import NavbarAdmin from "../../components/navbar/NavbarAdmin";
import Select from "react-select";
import { useEffect, useState } from "react";
import Axios from "axios";

const NewFiliere = () => {
  //get all the doamines names from the DB
  const [fil, setFil] = useState([]);
  useEffect(() => {
    Axios.get("http://localhost:3001/filiere").then((response) => {
      setFil(response.data);
    });
  }, []);

  //push the domaine's id & names in options to pass them to the select
  const optionsDom = [];
  for (let i = 0; i < fil.length; i++) {
    var object = {};
    if (fil.length > 0) {
      object["id"] = fil[i].id_domaine;
      object["value"] = fil[i].id_domaine;
      object["label"] = fil[i].name;
    }
    optionsDom.push(object);
  }

  //add domaine
  const [name, setName] = useState("");

  const addFiliere = () => {
    Axios.post("http://localhost:3001/addFiliere", {
      name: name,
    }).then(() => {
      // console.log("success!");
      alert("success!");
    });
  };
  return (
    <div className="new">
      <SidebarAdmin />
      <div className="newContainer">
        <NavbarAdmin />
        <div className="top">
          <h1>Ajouter une nouvelle filière</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              <div className="formInput">
                <label>Listes des filières déjà existé</label>
                <Select
                  options={optionsDom}
                  menuPlacement="bottom"
                  className="select"
                />
              </div>
              <div className="formInput">
                <label>Ajouter une nouvelle filière</label>
                <input
                  type="text"
                  className="userUpdateInput"
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                />
              </div>
              <button onClick={addFiliere}>Ajouter</button>
            </form>
            {/* <button onClick={addDomaine}>Ajouter</button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewFiliere;
