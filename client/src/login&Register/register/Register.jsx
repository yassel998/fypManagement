import "./register.css";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Axios from "axios";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { schema } from "../schemas/register.js";
import CustomSelect from "./CustomSelect";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Register = () => {
  //get the filiere's names from the DB
  const [faculty, setFaculty] = useState([]);
  useEffect(() => {
    Axios.get("http://localhost:3001/filiere").then((response) => {
      setFaculty(response.data);
    });
  }, []);

  //get all the prerequis names from the DB
  const [prerequi, setPrerequi] = useState([]);
  useEffect(() => {
    Axios.get("http://localhost:3001/prerequi").then((response) => {
      setPrerequi(response.data);
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

  //catch the selected prerequis (values of optionsPre)
  const [preId, setPreId] = useState([]);
  const handlePre = (e) => {
    setPreId(Array.isArray(e) ? e.map((x) => x.value) : []);
  };

  //submit the from & store the Prerequisites in Prerequisites Table
  const onSubmit = (values, actions) => {
    Axios.post("http://localhost:3001/registerStudent", {
      filiere: values.filiere,
      firstName: values.firstName,
      lastName: values.lastName,
      phone: values.phone,
      email: values.email,
      password: values.password,
      role: 2,
      idPrerequisites: preId,
    }).then((response) => {
      // if (!response.data.message) {
      //   // console.log("success!");
      //   popup();
      //   actions.resetForm();
      // }
      if (response.data.message) {
        // console.log("success!");
        popupDup();

        actions.resetForm();
      }
      // else if (!response.data.message) {
      //   popup();
      //   actions.resetForm();
      // }
    });
    popup();
    actions.resetForm();
  };

  //formik
  const {
    values,
    errors,
    handleBlur,
    isSubmitting,
    handleChange,
    handleSubmit,
    touched,
    setFieldValue,
    setFieldTouched,
  } = useFormik({
    initialValues: {
      lastName: "",
      firstName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      filiere: "",
      prerequis: "",
    },
    validationSchema: schema,
    onSubmit,
  });

  //filter the prerequis according to the selected filiere
  //display only prerequis related to the selected filiere
  const result = prerequi.filter((pre) => pre.idFiliere === values.filiere);

  //push the prerequi's id & names in options to pass them to the select
  const optionsPre = [];
  for (let i = 0; i < result.length; i++) {
    var object = {};
    if (prerequi.length > 0) {
      object["id"] = result[i].idFiliere;
      object["value"] = result[i].idprerequis;
      object["label"] = result[i].name;
    }
    optionsPre.push(object);
  }

  //popup after registratiion
  function popup() {
    Swal.fire({
      title: "Vous êtes inscrit!",
      text: "Vos coordonnées ont été soumises avec succès",
      icon: "success",
      confirmButtonText: "OK",
    });
  }

  //popup after registratiion
  function popupDup() {
    Swal.fire({
      title: "Email existe déjà!",
      text: "Veuillez saisir une autre adresse e-mail",
      icon: "warning",
      confirmButtonText: "OK",
    });
  }

  //Add some animation to the second select
  const animatedComponents = makeAnimated();

  return (
    <div className="register">
      <div className="registerContainer">
        <div className="title">
          <div className="right">
            <Link to="/" style={{ color: "black", fontSize: 18 }}>
              Vous avez déjà un compte?
            </Link>
          </div>
          <div className="left">L' inscription</div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="user-details">
            <div className="input-box">
              <span className="details">Nom</span>
              <input
                type="text"
                id="lastName"
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Entrez votre nom"
                className={
                  errors.lastName && touched.lastName ? "input-error" : ""
                }
              />
              {errors.lastName && touched.lastName && (
                <p className="error">{errors.lastName}</p>
              )}
            </div>
            <div className="input-box">
              <span className="details">Prénom</span>
              <input
                type="text"
                id="firstName"
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Entrez votre prénom"
                className={
                  errors.firstName && touched.firstName ? "input-error" : ""
                }
              />
              {errors.firstName && touched.firstName && (
                <p className="error">{errors.firstName}</p>
              )}
            </div>
            <div className="input-box">
              <span className="details">Email</span>
              <input
                value={values.email}
                id="email"
                onChange={handleChange}
                onBlur={handleBlur}
                type="email"
                placeholder="Entrez votre email"
                className={errors.email && touched.email ? "input-error" : ""}
              />
              {errors.email && touched.email && (
                <p className="error">{errors.email}</p>
              )}
            </div>
            <div className="input-box">
              <span className="details">Numéro de téléphone</span>
              <input
                value={values.phone}
                id="phone"
                onChange={handleChange}
                onBlur={handleBlur}
                type="text"
                placeholder="Entrez votre numéro de téléphone"
                className={errors.phone && touched.phone ? "input-error" : ""}
              />
              {errors.phone && touched.phone && (
                <p className="error">{errors.phone}</p>
              )}
            </div>
            <div className="input-box">
              <span className="details">Mot de passe</span>
              <input
                value={values.password}
                id="password"
                onChange={handleChange}
                onBlur={handleBlur}
                type="password"
                placeholder="Entrez votre mot de passe"
                className={
                  errors.password && touched.password ? "input-error" : ""
                }
              />
              {errors.password && touched.password && (
                <p className="error">{errors.password}</p>
              )}
            </div>
            <div className="input-box">
              <span className="details">Confirmer le mot de passe</span>
              <input
                value={values.confirmPassword}
                id="confirmPassword"
                onChange={handleChange}
                onBlur={handleBlur}
                type="password"
                placeholder="Confirmer votre mot de passe"
                className={
                  errors.confirmPassword && touched.confirmPassword
                    ? "input-error"
                    : ""
                }
              />
              {errors.confirmPassword && touched.confirmPassword && (
                <p className="error">{errors.confirmPassword}</p>
              )}
            </div>
            <div className="input-box">
              <span className="details">Filière</span>
              <CustomSelect
                options={options}
                value={values.filiere}
                onChange={(value) => setFieldValue("filiere", value.id)}
                onBlur={(value) => setFieldTouched("filiere", value.id)}
              />
              {errors.filiere && touched.filiere && (
                <p className="error">{errors.filiere}</p>
              )}
            </div>
            <div className="input-box">
              <span className="details">Prérequis</span>
              <Select
                options={optionsPre}
                isMulti
                onChange={handlePre}
                placeholder="e.g. (php, c++, machine learning)"
                menuPlacement="top"
                components={animatedComponents}
              />
            </div>
            {/* <div className="input-box">
              <span className="details">Prérequis</span>
              <input type="file" id="myfile" name="myfile" />
            </div> */}
          </div>
          <div className="button">
            <button disabled={isSubmitting} type="submit">
              S'inscrire
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
