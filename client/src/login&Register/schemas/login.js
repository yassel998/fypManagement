import * as yup from "yup";

export const schema = yup.object().shape({
  email: yup
    .string()
    .email("Veuillez entrer un email valide")
    .required("Champs obligatoire"),
  password: yup
    .string()
    .min(5, "Entrez au moins 5 caractères")
    .required("Champs obligatoire"),
});
