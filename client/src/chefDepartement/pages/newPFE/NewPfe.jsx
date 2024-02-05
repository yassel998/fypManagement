import "./newPfe.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Select from "react-select";
import { useEffect, useState } from "react";
import Axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const NewPfe = () => {
  const id = Cookies.get("filId");
  const prof = Cookies.get("userId");

  //get all the doamines names from the DB
  const [domaine, setDomaine] = useState([]);
  useEffect(() => {
    Axios.get(`http://localhost:3001/domaineFil/${id}`).then((response) => {
      setDomaine(response.data);
    });
  }, [id]);

  //push the domaine's id & names in options to pass them to the select
  const optionsDom = [];
  for (let i = 0; i < domaine.length; i++) {
    var object = {};
    if (domaine.length > 0) {
      object["id"] = domaine[i].id_domaine;
      object["value"] = domaine[i].id_domaine;
      object["label"] = domaine[i].name;
    }
    optionsDom.push(object);
  }

  //catch the selected doamaine (values of optionsPre)
  const [domId, setDomId] = useState("");
  const handleDom = (e) => {
    setDomId(e.id);
  };

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

  //catch the selected prerequis (values of optionsPre)
  const [preId, setPreId] = useState([]);
  const handlePre = (e) => {
    setPreId(Array.isArray(e) ? e.map((x) => x.value) : []);
  };

  //popup after registratiion
  function popup() {
    Swal.fire({
      title: "Vous êtes inscrit!",
      text: "Vos coordonnées ont été soumises avec succès",
      icon: "success",
      confirmButtonText: "OK",
    });
  }

  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [nbr_etd, setNbr_etd] = useState("");
  //submit the from & store the Prerequisites in Prerequisites Table
  const onSubmit = () => {
    Axios.post("http://localhost:3001/newPfe", {
      filiere: id,
      titre: titre,
      description: description,
      domaine: domId,
      nbr_etd: nbr_etd,
      prof: prof,
      idPrerequisites: preId,
      avancement: "postulé",
    }).then(() => {
      console.log("success!");
      alert("updated");

      // popup();
    });
  };

  return (
    <div className="newPfeChefDep">
      <Sidebar />
      <div className="newContainerNewPfeChefDep">
        <Navbar />
        <div className="topNewPfeChef">
          <h1>Ajouter un nouvel PFE</h1>
        </div>
        <div className="bottomNewPfeChe">
          <div className="leftNewChef">
            <img src={require("./picture.png")} alt="" />
          </div>
          <div className="rightNewChef">
            <form onSubmit={onSubmit}>
              <div className="formInputNewPfeChef">
                <label>Titre</label>
                <input
                  type="text"
                  placeholder="title"
                  className="userUpdateInput"
                  onChange={(event) => {
                    setTitre(event.target.value);
                  }}
                />
              </div>
              <div className="formInputNewPfeChef">
                <label>Prérequis</label>
                <Select
                  options={optionsPre}
                  menuPlacement="top"
                  className="select"
                  onChange={handlePre}
                  isMulti
                />
              </div>
              <div className="formInputNewPfeChef">
                <label>Domaine</label>
                <Select
                  options={optionsDom}
                  menuPlacement="top"
                  onChange={handleDom}
                  className="select"
                />
              </div>
              <div className="formInputNewPfeChef">
                <label>Description</label>
                <textarea
                  rows="8"
                  cols="70"
                  placeholder="test test test test test test test test test test test test test test test"
                  onChange={(event) => {
                    setDescription(event.target.value);
                  }}
                />
              </div>
              <div className="formInputNewPfeChef">
                <label>Nombre des étudiants</label>
                <input
                  type="number"
                  // className="userUpdateInput"
                  min="1"
                  max="3"
                  className="nmbrEtd"
                  onChange={(event) => {
                    setNbr_etd(event.target.value);
                  }}
                />
              </div>
              <button type="submit">Ajouter</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NewPfe;
