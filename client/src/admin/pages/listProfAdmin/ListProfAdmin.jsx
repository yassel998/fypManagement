import "./listProf.scss";
import SidebarAdmin from "../../components/sidebar/SidebarAdmin";
import NavbarAdmin from "../../components/navbar/NavbarAdmin";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import Axios from "axios";
import Swal from "sweetalert2";

const ListProfAdmin = () => {
  //temporary
  const columns = [
    // { field: "id", headerName: "ID", width: 90 },
    {
      field: "firstName",
      headerName: "Nom",
      headerAlign: "center",
      width: 160,
    },
    {
      field: "lastName",
      headerName: "Prénom",
      headerAlign: "center",
      width: 160,
    },
    {
      field: "filiere",
      headerName: "filière",
      headerAlign: "center",
      width: 230,
    },
    {
      field: "email",
      headerName: "Email",
      width: 270,
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "phone",
      headerName: "Téléphone",
      width: 120,
      headerAlign: "center",
      // flex: 1,
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

  //get all prof
  const [profList, setProfList] = useState([]);
  //grab data from the DB & display them in our page
  useEffect(() => {
    let mounted = true;
    Axios.get("http://localhost:3001/allProf").then((response) => {
      if (mounted) {
        setProfList(response.data);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  //POP-UP delete student!
  const deleteDemande = (id) => {
    Axios.delete(`http://localhost:3001/deleteUser/${id}`).then(() => {
      Axios.get("http://localhost:3001/allProf").then((response) => {
        setProfList(response.data);
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
        Swal.fire("Supprimé!", "Le professeur a été supprimé.", "success");
      }
    });
  }
  return (
    <div className="listProf">
      <SidebarAdmin />
      <div className="listProfContainer">
        <NavbarAdmin />
        <div className="dataTableProf">
          <h1>Liste des Prof's</h1>
          <div style={{ height: 515, width: "100%" }}>
            <DataGrid
              rows={profList}
              columns={columns}
              pageSize={8}
              autoPageSize
              rowsPerPageOptions={[8]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListProfAdmin;
