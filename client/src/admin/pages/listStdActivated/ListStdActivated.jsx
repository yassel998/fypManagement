import "./listStdActivated.scss";
import SidebarAdmin from "../../components/sidebar/SidebarAdmin";
import NavbarAdmin from "../../components/navbar/NavbarAdmin";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import Axios from "axios";
import Swal from "sweetalert2";

const ListStdActivated = () => {
  const columns = [
    // { field: "id", headerName: "ID", width: 60 },
    {
      field: "firstName",
      headerName: "Nom",
      headerAlign: "center",
      width: 140,
    },
    {
      field: "lastName",
      headerName: "Prénom",
      headerAlign: "center",
      width: 140,
    },
    { field: "email", headerName: "Email", headerAlign: "center", width: 290 },
    {
      field: "phone",
      headerName: "Téléphone",
      headerAlign: "center",
      width: 150,
    },
    {
      field: "filiere",
      headerName: "filiere",
      headerAlign: "center",
      width: 180,
    },
    {
      field: "action",
      headerName: "Action",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 110,
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              className="deleteAdmin"
              onClick={() => {
                popup(params.row.id);
              }}
            >
              Supprimer
            </div>
          </div>
        );
      },
    },
  ];

  //grab data from the DB & display them in our page
  const [studentList, setStudentList] = useState([]);

  //fetch data from the server to display them in our page
  useEffect(() => {
    let mounted = true;
    Axios.get("http://localhost:3001/stdListeAct").then((response) => {
      if (mounted) {
        setStudentList(response.data);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  //POP-UP delete student!
  const deleteDemande = (id) => {
    Axios.delete(`http://localhost:3001/deleteUser/${id}`).then(() => {
      Axios.get("http://localhost:3001/stdListeAct").then((response) => {
        setStudentList(response.data);
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
      confirmButtonText: "Oui, supprimer",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteDemande(id);
        Swal.fire("Supprimé!", "L'étudiant a été supprimé.", "success");
      }
    });
  }
  return (
    <div className="list">
      <SidebarAdmin />
      <div className="listContainer">
        <NavbarAdmin />
        <div className="dataTable">
          <span>Liste des étudiants</span>
          <div style={{ height: 515, width: "100%" }}>
            <DataGrid
              rows={studentList}
              columns={columns}
              // pageSize={8}
              autoPageSize
              rowsPerPageOptions={[7]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListStdActivated;
