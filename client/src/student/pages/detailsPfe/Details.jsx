import "./details.scss";
import SidebarStd from "../../components/sidebar/SidebarStd";
import NavbarStudent from "../../components/navbar/NavbarStudent";
import { Link } from "@mui/material";
import { useEffect, useState } from "react";
import Axios from "axios";
import Cookies from "js-cookie";

const Details = () => {
  const idPfe = window.location.pathname.slice(17);

  //grab data from the DB & display them in our page
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [nbrEtd, setNbrEtd] = useState("");
  const [domaine, setDomaine] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [fname, setFname] = useState("");

  //fetch data from the server to display them in our page
  useEffect(() => {
    let mounted = true;
    Axios.get(`http://localhost:3001/SinglePfe/${idPfe}`).then((response) => {
      if (mounted) {
        setTitre(response.data[0].titre);
        setDescription(response.data[0].description);
        setNbrEtd(response.data[0].nbr_etd);
        setDomaine(response.data[0].domaine);
        setEmail(response.data[0].email);
        setPhone(response.data[0].phone);
        setFname(response.data[0].fname);
      }
    });
    return () => {
      mounted = false;
    };
  }, [idPfe]);
// console.log();
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
  return (
    <div className="singlePfe">
      <SidebarStd />
      <div className="singlePfeContainer">
        <NavbarStudent />
        <div className="container">
          <div className="left">
            <h1 className="title">Informations</h1>
            <div className="details">
              <h1 className="itemTitle">{titre}</h1>
              {/* <div className="detailItem">
                <span className="itemKey">Titre:</span>
                <span className="itemValue">React Dashboard</span>
              </div> */}
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
              {/* <div className="detailItem">
                <span className="itemKey">Avancement:</span>
                <span className="itemValue">
                  en cours Wikipedia (/ˌwɪkɪˈpiːdiə/ (listen) wik-ih-PEE-dee-ə
                  or /ˌwɪki-/ (listen) wik-ee-) is a multilingual free online
                  encyclopedia written and maintained by a community of
                  volunteers through open collaboration and a wiki-based editing
                  system. Its editors are known as Wikipedians. Wikipedia is the
                  largest and most-read reference work in history.[3] It is
                  consistently one of the 10 most popular websites ranked by the
                  Similarweb and formerly Alexa; as of 2022, Wikipedia was
                  ranked the 7th most popular site.
                </span>
              </div> */}
               <div className="detailItem">
                <span className="itemKey">Nombre d'étudiants:</span>
                <span className="itemValue">{nbrEtd}</span>
              </div>
              <div className="detailItem">
                <span className="itemKey">Prof:</span>
                <span className="itemValue">{fname}</span>
              </div>
              <div className="detailItem">
                <span className="itemKey">Numéro de téléphone:</span>
                <span className="itemValue">{phone}</span>
              </div>
              <div className="detailItem">
                <span className="itemKey">Email:</span>
                <Link
                  to={"https://mail.google.com/mail/u/0/#inbox?compose=new"}
                >
                  <span className="itemValue">{email}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
