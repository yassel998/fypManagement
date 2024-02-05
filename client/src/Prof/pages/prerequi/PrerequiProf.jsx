import "./prerequiProf.scss";
import SidebarProf from "../../components/sidebar/SidebarProf";
import NavbarProf from "../../components/navbar/NavbarProf";
import Select from "react-select";
import { useEffect, useState } from "react";
import Axios from "axios";
import Cookies from "js-cookie";

const PrerequiProf = () => {
  const id = Cookies.get("filId");

  //get all the prerequis names from the DB
  const [prerequi, setPrerequi] = useState([]);
  useEffect(() => {
    Axios.get(`http://localhost:3001/prerequisFil/${id}`).then((response) => {
      setPrerequi(response.data);
    });
  }, [id]);

  //push the prerequi's id & names in options to pass them to the select
  const optionsPre = [];
  for (let i = 0; i < prerequi.length; i++) {
    var obj = {};
    if (prerequi.length > 0) {
      obj["id"] = prerequi[i].idFiliere;
      obj["value"] = prerequi[i].idprerequis;
      obj["label"] = prerequi[i].name;
    }
    optionsPre.push(obj);
  }

  //add domaine
  const [name, setName] = useState("");
  console.log(name);
  const addPrerequi = () => {
    Axios.post("http://localhost:3001/addPrerequi", {
      name: name,
      idFiliere: id,
    }).then(() => {
      // console.log("success!");
      alert("success!");
    });
  };
  return (
    <div className="new">
      <SidebarProf />
      <div className="newContainer">
        <NavbarProf />
        <div className="top">
          <h1>Ajouter un nouvel prérequi</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              <div className="formInput">
                <label>Listes des prérequis déjà existé</label>
                <Select
                  options={optionsPre}
                  menuPlacement="bottom"
                  className="select"
                />
              </div>
              <div className="formInput">
                <label>Ajouter un nouveau prérequi</label>
                <input
                  type="text"
                  className="userUpdateInput"
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                />
              </div>
              <button onClick={addPrerequi}>Ajouter</button>
            </form>
            {/* <button onClick={addDomaine}>Ajouter</button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrerequiProf;
