import "./listStudent.scss";
import SidebarAdmin from "../../components/sidebar/SidebarAdmin";
import NavbarAdmin from "../../components/navbar/NavbarAdmin";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import Axios from "axios";
import Swal from "sweetalert2";
import CancelIcon from "@mui/icons-material/Cancel";

const ListStudentAdmin = () => {
  const columns = [
    // { field: "id", headerName: "ID", width: 60 },
    {
      field: "firstName",
      headerName: "Nom",
      headerAlign: "center",
      width: 130,
    },
    {
      field: "lastName",
      headerName: "Prénom",
      headerAlign: "center",
      width: 130,
    },
    { field: "email", headerName: "Email", headerAlign: "center", width: 270 },
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
      width: 190,
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              className="viewButton"
              onClick={() => {
                popupValider(
                  params.row.id,
                  params.row.firstName,
                  params.row.lastName
                );
              }}
            >
              Activer le compte
            </div>
            <CancelIcon
              className="deleteButtonChefDep"
              onClick={() => {
                popup(params.row.id);
              }}
            />
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
    Axios.get("http://localhost:3001/stdListe").then((response) => {
      if (mounted) {
        setStudentList(response.data);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  //POP-UP affect pfe confirmation!
  const valider = (id) => {
    Axios.put("http://localhost:3001/validStd", {
      id: id,
    }).then((response) => {
      // alert("updated");
      Axios.get("http://localhost:3001/stdListe").then((response) => {
        setStudentList(response.data);
      });
    });
  };

  function popupValider(id, fname, lname) {
    Swal.fire({
      title: "Êtes vous sûr?",
      text: "Voulez vous activez  le compte de : " + fname + " " + lname + " ?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Annuler",
      confirmButtonText: "Oui, activé le compte",
    }).then((result) => {
      if (result.isConfirmed) {
        valider(id);
        Swal.fire("Affecté!", "Le compte est affecté.", "success");
      }
    });
  }

  //POP-UP reject the activation!
  const deleteUser = (id) => {
    Axios.delete(`http://localhost:3001/deleteUser/${id}`).then(() => {
      Axios.get("http://localhost:3001/stdListe").then((response) => {
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
      confirmButtonText: "Oui, rejeter la demande d'activation",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUser(id);
        Swal.fire("Rejeté!", "La demande a été rejeté.", "success");
      }
    });
  }
  return (
    <div className="list">
      <SidebarAdmin />
      <div className="listContainer">
        <NavbarAdmin />
        <div className="dataTable">
          <span>LListe des demandes d'activation du compte</span>
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

export default ListStudentAdmin;
