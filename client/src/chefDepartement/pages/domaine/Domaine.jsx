import "./domaine.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Select from "react-select";
import { useEffect, useState } from "react";
import Axios from "axios";
import Cookies from "js-cookie";

const Domaine = () => {
  const id = Cookies.get("filId");

  //get all the doamines names from the DB
  const [dom, setDom] = useState([]);
  useEffect(() => {
    Axios.get(`http://localhost:3001/domaineFil/${id}`).then((response) => {
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
  const [name, setName] = useState("");
  console.log(name);
  const addDomaine = () => {
    Axios.post("http://localhost:3001/addDomaine", {
      name: name,
      idFiliere: id,
    }).then(() => {
      // console.log("success!");
      alert("success!");
    });
  };
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Ajouter un nouvel domaine</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              <div className="formInput">
                <label>Listes des domaines déjà existé</label>
                <Select
                  options={optionsDom}
                  menuPlacement="bottom"
                  className="select"
                />
              </div>
              <div className="formInput">
                <label>Ajouter un nouveau domaine</label>
                <input
                  type="text"
                  className="userUpdateInput"
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
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

export default Domaine;
