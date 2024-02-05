import "./singlePfe.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Select from "react-select";
import { useEffect, useState } from "react";
import Axios from "axios";
import Cookies from "js-cookie";

const SinglePfe = () => {
  // const id = window.location.pathname.slice(23);
  const idPfe = window.location.pathname.slice(23);
  const id = Cookies.get("filId");
  const prof = Cookies.get("userId");

  //grab data from the DB & display them in our page
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [nbrEtd, setNbrEtd] = useState("");
  const [domaine, setDomaine] = useState("");

  //fetch data from the server to display them in our page
  useEffect(() => {
    let mounted = true;
    Axios.get(`http://localhost:3001/SinglePfe/${idPfe}`).then((response) => {
      if (mounted) {
        setTitre(response.data[0].titre);
        setDescription(response.data[0].description);
        setNbrEtd(response.data[0].nbr_etd);
        setDomaine(response.data[0].domaine);
      }
    });
    return () => {
      mounted = false;
    };
  }, [idPfe]);

  //get prerequis for this pfe
  const [prere, setPrere] = useState([]);

  //fetch data from the server to display them in our page
  useEffect(() => {
    let mounted = true;
    Axios.get(`http://localhost:3001/prerequisPfe/${idPfe}`).then(
      (response) => {
        if (mounted) {
          setPrere(response.data);
        }
      }
    );
    return () => {
      mounted = false;
    };
  }, [idPfe]);

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

  //update profile
  const [newTitre, setNewTitre] = useState(titre);
  const [newDescription, setNewDescription] = useState(description);
  const [newNbrEtd, setNewNbrEtd] = useState(nbrEtd);

  const updatePfe = (id) => {
    Axios.put("http://localhost:3001/updatePfe", {
      filiere: id,
      titre: newTitre,
      description: newDescription,
      domaine: domId,
      nbr_etd: newNbrEtd,
      prof: prof,
      idPrerequisites: preId,
      id: idPfe,
    }).then((response) => {
      alert("updated");
    });
  };

  return (
    <div className="singlePfe">
      <Sidebar />
      <div className="singlePfeContainer">
        <Navbar />
        <div className="container">
          <div className="left">
            <h1 className="title">Information</h1>
            <div className="details">
              <h1 className="itemTitle">{titre}</h1>
              <div className="detailItem">
                <span className="itemKey">Prérequis:</span>
                <span className="itemValue">
                  {prere &&
                    prere.map((pre, index) => {
                      return <span key={index}>{pre.name} &nbsp;&nbsp;</span>;
                    })}
                </span>
              </div>
              <div className="detailItem">
                <span className="itemKey">Domaines:</span>
                <span className="itemValue">{domaine}</span>
              </div>
              <div className="detailItem">
                <span className="itemKey">Description:</span>
                <span className="itemValue">{description}</span>
              </div>
              <div className="detailItem">
                <span className="itemKey">Nombre d'étudiant:</span>
                <span className="itemValue">{nbrEtd}</span>
              </div>
            </div>
          </div>
          <div className="right">
            <div className="userUpdate">
              <span className="userUpdateTitle">Éditer</span>
              <form className="userUpdateForm" onSubmit={updatePfe}>
                <div className="userUpdateLeft">
                  <div className="userUpdateItem">
                    <label>Titre</label>
                    <input
                      type="text"
                      placeholder="title"
                      className="userUpdateInput"
                      defaultValue={titre}
                      onChange={(event) => {
                        setNewTitre(event.target.value);
                      }}
                    />
                  </div>
                  <div className="userUpdateItem">
                    <label>Prérequis</label>
                    <Select
                      options={optionsPre}
                      menuPlacement="top"
                      className="select"
                      isMulti
                      onChange={handlePre}
                    />
                  </div>
                  <div className="userUpdateItem">
                    <label>Domaine</label>
                    <Select
                      options={optionsDom}
                      menuPlacement="top"
                      className="select"
                      onChange={handleDom}
                    />
                  </div>
                  <div className="userUpdateItem">
                    <label>Description</label>
                    <textarea
                      rows="4"
                      cols="50"
                      defaultValue={description}
                      onChange={(event) => {
                        setNewDescription(event.target.value);
                      }}
                    ></textarea>
                  </div>
                  <div className="userUpdateItem">
                    <label>Nombre des étudiants</label>
                    <input
                      type="number"
                      // className="userUpdateInput"
                      min="1"
                      max="3"
                      className="nmbrEtd"
                      style={{ width: "50px" }}
                      defaultValue={nbrEtd}
                      onChange={(event) => {
                        setNewNbrEtd(event.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="userUpdateRight">
                  <button type="submit" className="userUpdateButtonSinglePfe">
                    Mettre à jour
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SinglePfe;
