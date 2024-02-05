import * as yup from "yup";
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const schema = yup.object().shape({
  lastName: yup
    .string()
    .matches(/^[A-Za-z ]*$/, "Veuillez saisir un nom valide")
    .required("Champs obligatoire"),
  firstName: yup
    .string()
    .matches(/^[A-Za-z ]*$/, "Veuillez saisir un prénom valide")
    .required("Champs obligatoire"),
  email: yup
    .string()
    .email("Veuillez entrer un email valide")
    .required("Champs obligatoire"),
  phone: yup
    .string()
    .matches(phoneRegExp, "Le numéro de téléphone n'est pas valide")
    .required("Champs obligatoire"),
  password: yup
    .string()
    .min(
      5,
      "Veuillez créer un mot de passe plus fort (au moins cinq caractères)"
    )
    .required("Champs obligatoire"),
  confirmPassword: yup
    .string()
    .oneOf(
      [yup.ref("password"), null],
      "Les mots de passe doivent correspondre"
    )
    .required("Champs obligatoire"),
  filiere: yup.number().required("Champs obligatoire"),
});
