import "./myPfe.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const MyPfe = () => {
  //************* */
  const id_user = Cookies.get("userId");

  const columns = [
    // { field: "id", headerName: "Id", width: 150 },
    { field: "titre", headerName: "Titre", headerAlign: "center", width: 350 },
    // { field: "prerequis", headerName: "Prérequis", width: 170 },
    // {
    //   field: "description",
    //   headerName: "Description",
    //   headerAlign: "center",
    //   width: 300,
    // },
    {
      field: "domaine",
      headerName: "Domaine",
      headerAlign: "center",
      width: 200,
    },
    {
      field: "nbr_etd",
      headerName: "№ étuds",
      headerAlign: "center",
      width: 120,
    },
    {
      field: "avancement",
      headerName: "Avancement",
      width: 140,
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus ${params.row.avancement}`}>
            {params.row.avancement}
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 250,
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={"/chefdepartement/myPfe/" + params.row.id}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">Voir plus des détails</div>
            </Link>
            <DeleteIcon
              className="deleteButtonChefDep"
              onClick={() => {
                popup(params.row.id);
              }}
            />
            <ChangeCircleIcon
              className="changeAdvancement"
              onClick={() => {
                advancement(params.row.id, params.row.titre);
              }}
            />
          </div>
        );
      },
      // flex: 1,
    },
  ];

  //grab data from the DB & display them in our page
  const [pfeList, setPfeList] = useState([]);

  //fetch data from the server to display them in our page
  useEffect(() => {
    let mounted = true;
    Axios.get(`http://localhost:3001/myPfe/${id_user}`).then((response) => {
      if (mounted) {
        setPfeList(response.data);
      }
    });
    return () => {
      mounted = false;
    };
  }, [id_user]);

  //POP-UP delete confirmation!
  const deletePfe = (id) => {
    Axios.delete(`http://localhost:3001/deletePfe/${id}`).then(() => {
      Axios.get(`http://localhost:3001/myPfe/${id_user}`).then((response) => {
        setPfeList(response.data);
      });
    });
  };

  function popup(id) {
    Swal.fire({
      title: "Êtes vous sûr?",
      text: "Vous ne pourrez pas revenir en arrière!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Annuler",
      confirmButtonText: "Oui, supprimez ",
    }).then((result) => {
      if (result.isConfirmed) {
        deletePfe(id);
        Swal.fire("Supprimé!", "Le PFE a été supprimé.", "success");
      }
    });
  }

  //POP-UP update advancement confirmation!
  const updateAdv = (id, avancement) => {
    Axios.put("http://localhost:3001/updateavan", {
      avancement: avancement,
      id: id,
    }).then((response) => {
      // alert("updated");
      Axios.get(`http://localhost:3001/myPfe/${id_user}`).then((response) => {
        setPfeList(response.data);
      });
    });
  };

  function advancement(id, pname) {
    Swal.fire({
      title: "Changer l'avancement du : " + pname,
      input: "select",
      inputOptions: {
        postulé: "postulé",
        en_cours: "en-cours ",
        terminé: "terminé",
        soutené: "soutené",
      },
      inputPlaceholder: "required",
      showCancelButton: true,
      cancelButtonText: "Annuler",
      inputValidator: function (value) {
        return new Promise(function (resolve, reject) {
          if (value !== "") {
            resolve();
          } else {
            resolve("Vous devez sélectionner un avancement");
          }
        });
      },
    }).then(function (result) {
      if (result.isConfirmed) {
        updateAdv(id, result.value);
        Swal.fire({
          icon: "success",
          html: "Vous avez changer l'avancement à: " + result.value,
        });
      }
    });
  }
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <div className="dataTable">
          <div className="dataTableTitle">
            Ajouter un nouvel PFE
            <Link
              to="/chefdepartement/new"
              style={{ textDecoration: "none" }}
              className="link"
            >
              Ajouter
            </Link>
          </div>
          <div style={{ height: 515, width: "100%" }}>
            <DataGrid
              rows={pfeList}
              columns={columns}
              pageSize={8}
              autoPageSize
              rowsPerPageOptions={[7]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPfe;
