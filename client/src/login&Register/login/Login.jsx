import { Link } from "react-router-dom";
import "./login.css";
import Axios from "axios";
import { schema } from "../schemas/login.js";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
  Axios.defaults.withCredentials = true;

  let navigate = useNavigate();

  //submit the from & store the Prerequisites in Prerequisites Table
  const onSubmit = (values, actions) => {
    Axios.post("http://localhost:3001/login", {
      email: values.email,
      password: values.password,
    }).then((response) => {
      if (!response.data.message) {
        // console.log(response);
        if (response.data[0].role === 0) {
          navigate("/prof/home");
        }
        if (response.data[0].role === 1) {
          navigate("/chefdepartement/home");
        }
        if (response.data[0].role === 2 && response.data[0].valid === 1) {
          navigate("/student/home");
        } else if (
          response.data[0].role === 2 &&
          response.data[0].valid === 0
        ) {
          Swal.fire({
            icon: "warning",
            title: "Oops...",
            text: "Votre compte n'a pas été activé! Veuillez attendre que l'administrateur activer votre compte",
          }).then(() => {
            window.location.reload();
          });
        }
        if (response.data[0].role === 3) {
          navigate("/admin/home");
        }
      }
      if (response.data.message) {
        // alert("Mauvaise combinaison email/mot de passe !");
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Mauvaise combinaison email/mot de passe !",
        }).then(() => {
          window.location.reload();
        });
      }
    });
    // actions.resetForm();
  };

  const sendPassword = (email) => {
    Axios.post("http://localhost:3001/reset-password-email", {
      email: email,
    }).then((response) => {});
    // actions.resetForm();
  };

  async function resetPass() {
    const { value: email } = await Swal.fire({
      title: "Input email address",
      input: "email",
      inputLabel: "Your email address",
      inputPlaceholder: "Enter your email address",
    });

    if (email) {
      sendPassword(email);
      Swal.fire(`Le mot de passe a été envoyé à: ${email}`);
    }
  }

  //formik
  const {
    values,
    errors,
    handleBlur,
    isSubmitting,
    handleChange,
    handleSubmit,
    touched,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit,
  });
  return (
    <div className="login">
      <div className="center">
        <h1>Se connecter</h1>
        <form onSubmit={handleSubmit}>
          <div className="txt_field">
            <label>Email</label>

            <input
              type="text"
              id="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.email && touched.email && (
              <p className="errorLogin">{errors.email}</p>
            )}
            {/* <span></span> */}
          </div>
          <div className="txt_field">
            <label>Mot de passe</label>
            <input
              type="password"
              id="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.password && touched.password && (
              <p className="errorLogin">{errors.password}</p>
            )}
            {/* <span></span> */}
          </div>
          <div
            className="pass"
            onClick={() => {
              resetPass();
            }}
          >
            Mot de passe oublié?
          </div>
          <button disabled={isSubmitting} type="submit">
            Se connecter
          </button>
          <div className="signup_link">
            Pas un membrer?
            <Link to="/register"> S'inscrire </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
