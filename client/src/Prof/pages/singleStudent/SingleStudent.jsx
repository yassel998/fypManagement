import "./singleStudent.scss";
import SidebarProf from "../../components/sidebar/SidebarProf";
import NavbarProf from "../../components/navbar/NavbarProf";
import { useState, useEffect } from "react";
import Axios from "axios";

const SingleStudent = () => {
  const id = window.location.pathname.slice(18);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [filiere, setFiliere] = useState("");
  useEffect(() => {
    let mounted = true;
    Axios.get(`http://localhost:3001/profileStd/${id}`).then((response) => {
      if (mounted) {
        setFname(response.data[0].firstName);
        setLname(response.data[0].lastName);
        setEmail(response.data[0].email);
        setPhone(response.data[0].phone);
        setFiliere(response.data[0].filiere);
      }
    });
    return () => {
      mounted = false;
    };
  }, [id]);
  //get prerequis for this student
  const [prere, setPrere] = useState([]);

  //fetch data from the server to display them in our page
  useEffect(() => {
    let mounted = true;
    Axios.get(`http://localhost:3001/prerequisStd/${id}`).then((response) => {
      if (mounted) {
        setPrere(response.data);
      }
    });
    return () => {
      mounted = false;
    };
  }, [id]);

  return (
    <div className="singlePfe">
      <SidebarProf />
      <div className="singlePfeContainer">
        <NavbarProf />
        <div className="container">
          <div className="left">
            <h1 className="title">Informations</h1>
            <div className="details">
              <h1 className="itemTitle">{fname + " " + lname}</h1>
              <div className="detailItem">
                <span className="itemKey">Nom:</span>
                <span className="itemValue">{lname}</span>
              </div>
              <div className="detailItem">
                <span className="itemKey">Prénom:</span>
                <span className="itemValue">{fname}</span>
              </div>
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
                <span className="itemKey">filière:</span>
                <span className="itemValue">{filiere}</span>
              </div>
              <div className="detailItem">
                <span className="itemKey">Email:</span>
                <span className="itemValue">{email}</span>
              </div>
              <div className="detailItem">
                <span className="itemKey">Phone:</span>
                <span className="itemValue">{phone}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleStudent;
