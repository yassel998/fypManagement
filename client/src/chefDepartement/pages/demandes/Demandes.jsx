import "./demandes.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import CancelIcon from "@mui/icons-material/Cancel";

const Demandes = () => {
  const id_user = Cookies.get("userId");

  const columns = [
    // { field: "id", headerName: "Id", width: 150 },
    { field: "titre", headerName: "Titre", headerAlign: "center", width: 420 },
    {
      field: "firstName",
      headerName: "Prénom",
      headerAlign: "center",
      width: 115,
    },
    {
      field: "lastName",
      headerName: "Nom",
      headerAlign: "center",
      width: 115,
    },
    {
      field: "date",
      headerName: "date de postulation",
      width: 160,
      headerAlign: "center",
    },
    {
      field: "action",
      headerName: "Action",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 135,
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={"/chefdepartement/studentInfo/" + params.row.idUser}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">Voir plus des détails</div>
            </Link>
            <TaskAltIcon
              className="changeAdvancement"
              onClick={() => {
                popupAffecter(
                  params.row.id,
                  params.row.firstName,
                  params.row.lastName
                );
              }}
            />

            <CancelIcon
              className="deleteButtonChefDep"
              onClick={() => {
                popup(params.row.id);
              }}
            />
          </div>
        );
      },
      flex: 1,
    },
  ];

  //grab data from the DB & display them in our page
  const [pfeList, setPfeList] = useState([]);

  //fetch data from the server to display them in our page
  useEffect(() => {
    let mounted = true;
    Axios.get(`http://localhost:3001/demandes/${id_user}`).then((response) => {
      if (mounted) {
        setPfeList(response.data);
      }
    });
    return () => {
      mounted = false;
    };
  }, [id_user]);

  console.log(pfeList);
  //POP-UP delete confirmation!
  const deleteDemande = (id) => {
    Axios.delete(`http://localhost:3001/deleteDemande/${id}`).then(() => {
      Axios.get(`http://localhost:3001/demandes/${id_user}`).then(
        (response) => {
          setPfeList(response.data);
        }
      );
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
      confirmButtonText: "Oui, rejeter la demande",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteDemande(id);
        Swal.fire("Rejeté!", "La demande a été rejeté.", "success");
      }
    });
  }

  //POP-UP affect pfe confirmation!
  const affectPfe = (id) => {
    Axios.put("http://localhost:3001/affectPfe", {
      id: id,
    }).then((response) => {
      // alert("updated");
      Axios.get(`http://localhost:3001/demandes/${id_user}`).then(
        (response) => {
          setPfeList(response.data);
        }
      );
    });
  };
  function popupAffecter(id, fname, lname) {
    Swal.fire({
      title: "Êtes vous sûr?",
      text: "Voulez vous affecter ce PFE à " + fname + " " + lname,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Annuler",
      confirmButtonText: "Oui, affecter le PFE",
    }).then((result) => {
      if (result.isConfirmed) {
        affectPfe(id);
        Swal.fire("Affecté!", "Le demande a été affecté.", "success");
      }
    });
  }
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <div className="dataTable">
          <div className="dataTableTitle">Demandes des étudiants</div>
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

export default Demandes;
