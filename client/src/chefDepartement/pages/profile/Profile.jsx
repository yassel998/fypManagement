import "./profile.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Select from "react-select";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import Axios from "axios";

const Profile = () => {
  //get the loggedIn id
  const id = Cookies.get("userId");
  // const id = 36;

  //get the filiere's names from the DB
  const [faculty, setFaculty] = useState([]);
  useEffect(() => {
    Axios.get("http://localhost:3001/filiere").then((response) => {
      setFaculty(response.data);
    });
  }, []);

  //push the filiere's id & names in options to pass them to the select
  const options = [];
  for (var i = 0; i < faculty.length; i++) {
    var obj = {};
    if (faculty.length > 0) {
      obj["id"] = faculty[i].idFiliere;
      obj["value"] = faculty[i].name;
      obj["label"] = faculty[i].name;
    }
    options.push(obj);
  }

  //fetch data from the server to display them in our page
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [filiere, setFiliere] = useState("");
  useEffect(() => {
    let mounted = true;
    Axios.get(`http://localhost:3001/profile/${id}`).then((response) => {
      if (mounted) {
        setFname(response.data[0].firstName);
        setLname(response.data[0].lastName);
        setEmail(response.data[0].email);
        setPhone(response.data[0].phone);
        setPassword(response.data[0].password);
        setFiliere(response.data[0].filiere);
        console.log(response.data[0]);
      }
    });
    return () => {
      mounted = false;
    };
  }, [id]);

  //catch the selected item (id)
  const [getFil, setgetFil] = useState();
  const handle = (e) => {
    setgetFil(e.id);
  };

  //update profile
  const [newFname, setNewFname] = useState(fname);
  const [newLname, setNewLname] = useState(lname);
  const [newEmail, setNewEmail] = useState(email);
  const [newPhone, setNewPhone] = useState(phone);
  const [newPassword, setNewPassword] = useState(password);

  const updateProfile = (id) => {
    Axios.put("http://localhost:3001/updateProfile", {
      fil: getFil,
      firstName: newFname,
      lastName: newLname,
      email: newEmail,
      phone: newPhone,
      password: newPassword,
      id: id,
    }).then((response) => {
      alert("updated");
    });
  };

  return (
    <div className="profile">
      <Sidebar />
      <div className="profileContainer">
        <Navbar />
        <div className="containerProf">
          <div className="leftProf">
            <h1 className="title">Information</h1>
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
          <div className="rightProf">
            <div className="userUpdate">
              <span className="userUpdateTitle">Éditer</span>
              <form className="userUpdateForm">
                <div className="userUpdateLeft">
                  <div className="userUpdateItem">
                    <label>Nom</label>
                    <input
                      type="text"
                      defaultValue={lname}
                      className="userUpdateInput"
                      onChange={(event) => {
                        setNewLname(event.target.value);
                      }}
                    />
                  </div>
                  <div className="userUpdateItem">
                    <label>Prénom</label>
                    <input
                      type="text"
                      defaultValue={fname}
                      className="userUpdateInput"
                      onChange={(event) => {
                        setNewFname(event.target.value);
                      }}
                    />
                  </div>
                  <div className="userUpdateItem">
                    <label>filière</label>
                    <Select
                      options={options}
                      // defaultValue={{
                      //   label: fil.name,
                      //   value: fil.idFiliere,
                      // }}
                      menuPlacement="top"
                      className="select"
                      onChange={handle}
                    />
                  </div>
                  <div className="userUpdateItem">
                    <label>Email</label>
                    <input
                      type="text"
                      defaultValue={email}
                      className="userUpdateInput"
                      onChange={(event) => {
                        setNewEmail(event.target.value);
                      }}
                    />
                  </div>
                  <div className="userUpdateItem">
                    <label>Password</label>
                    <input
                      type="text"
                      defaultValue={password}
                      className="userUpdateInput"
                      onChange={(event) => {
                        setNewPassword(event.target.value);
                      }}
                    />
                  </div>
                  <div className="userUpdateItem">
                    <label>Phone</label>
                    <input
                      type="text"
                      defaultValue={phone}
                      className="userUpdateInput"
                      onChange={(event) => {
                        setNewPhone(event.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="userUpdateRight">
                  <button
                    className="userUpdateButton"
                    onClick={() => {
                      updateProfile(id);
                    }}
                  >
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

export default Profile;
