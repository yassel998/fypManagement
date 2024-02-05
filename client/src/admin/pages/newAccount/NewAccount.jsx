import "./newAccount.scss";
import SidebarAdmin from "../../components/sidebar/SidebarAdmin";
import NavbarAdmin from "../../components/navbar/NavbarAdmin";
import Select from "react-select";
import Axios from "axios";
import { useEffect, useState } from "react";

const Domaine = () => {
  //get the filiere's names from the DB
  const [faculty, setFaculty] = useState([]);
  useEffect(() => {
    Axios.get("http://localhost:3001/filiere").then((response) => {
      setFaculty(response.data);
    });
  }, []);

  //push the filiere's id & names in options to pass them to the select
  const optionsFil = [];
  for (var i = 0; i < faculty.length; i++) {
    var obj = {};
    if (faculty.length > 0) {
      obj["id"] = faculty[i].idFiliere;
      obj["value"] = faculty[i].name;
      obj["label"] = faculty[i].name;
    }
    optionsFil.push(obj);
  }

  const options = [
    { value: "0", label: "prof" },
    { value: "1", label: "chef de departement" },
  ];

  //create accounts for prof/chef dep
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [fil, setFil] = useState("");
  const createProf = () => {
    Axios.post("http://localhost:3001/adminCreate", {
      email: email,
      password: password,
      role: role,
      filiere: fil,
    }).then(() => {
      console.log("success!");
      alert("Succès");
    });
  };

  const handle = (e) => {
    setRole(e.value);
  };

  const handleFil = (e) => {
    setFil(e.id);
  };
  fil && console.log(fil);

  return (
    <div className="new">
      <SidebarAdmin />
      <div className="newContainer">
        <NavbarAdmin />
        <div className="top">
          <h1>Créer un compte prof/chef de département</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              <div className="formInput">
                {/* <label>Listes des domaines déjà existé</label> */}
                <input
                  type="text"
                  placeholder="email"
                  className="adminInp"
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
              </div>
              <div className="formInput">
                {/* <label>Ajouter un nouveau domaine</label> */}
                <input
                  type="text"
                  placeholder="mot de passe"
                  className="adminInp"
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                />
              </div>
              <div className="formInput">
                {/* <label>Ajouter un nouveau domaine</label> */}
                <Select
                  options={options}
                  className="adminSelect"
                  onChange={handle}
                />
              </div>
              <div className="formInput">
                {/* <label>Ajouter un nouveau domaine</label> */}
                <Select
                  options={optionsFil}
                  className="adminSelect"
                  onChange={handleFil}
                />
              </div>
              <button onClick={createProf}>Ajouter</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Domaine;
