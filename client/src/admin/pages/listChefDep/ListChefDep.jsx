import "./listChefDep.scss";
import SidebarAdmin from "../../components/sidebar/SidebarAdmin";
import NavbarAdmin from "../../components/navbar/NavbarAdmin";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import Axios from "axios";
import Swal from "sweetalert2";

const ListChefDep = () => {
  //temporary
  const columns = [
    // { field: "id", headerName: "ID", width: 90 },
    {
      field: "firstName",
      headerName: "Nom",
      headerAlign: "center",
      width: 170,
    },
    {
      field: "lastName",
      headerName: "Prénom",
      headerAlign: "center",
      width: 170,
    },
    {
      field: "filiere",
      headerName: "filière",
      headerAlign: "center",
      width: 190,
    },
    {
      field: "email",
      headerName: "Email",
      headerAlign: "center",
      width: 290,
      // flex: 1,
    },
    {
      field: "phone",
      headerName: "Téléphone",
      headerAlign: "center",
      width: 120,
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

  //get all Chef Dep
  const [chefDepList, setChefDepList] = useState([]);
  //grab data from the DB & display them in our page
  useEffect(() => {
    let mounted = true;
    Axios.get("http://localhost:3001/allChefDep").then((response) => {
      if (mounted) {
        setChefDepList(response.data);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  //POP-UP delete student!
  const deleteDemande = (id) => {
    Axios.delete(`http://localhost:3001/deleteUser/${id}`).then(() => {
      Axios.get("http://localhost:3001/allChefDep").then((response) => {
        setChefDepList(response.data);
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
        Swal.fire(
          "Supprimé!",
          "Le chef de département a été supprimé.",
          "success"
        );
      }
    });
  }

  return (
    <div className="listProf">
      <SidebarAdmin />
      <div className="listProfContainer">
        <NavbarAdmin />
        <div className="dataTableProf">
          <h1>Liste des chefs des départements</h1>
          <div style={{ height: 515, width: "100%" }}>
            <DataGrid
              rows={chefDepList}
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

export default ListChefDep;
