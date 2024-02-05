import NavbarStudent from "../../components/navbar/NavbarStudent";
import SidebarPStd from "../../components/sidebar/SidebarStd";
import "./postul.scss";
import { DataGrid } from "@mui/x-data-grid";
import Axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import Swal from "sweetalert2";

const Postul = () => {
  const id_user = Cookies.get("userId");

  //temporary
  const columns = [
    {
      field: "titre",
      headerName: "Titre PFE",
      headerAlign: "center",
      width: 620,
    },
    {
      field: "fname",
      headerName: "Prof",
      headerAlign: "center",
      width: 180,
    },
    {
      field: "date",
      headerName: "date de postulation",
      width: 170,
      headerAlign: "center",
    },
    // {
    //   field: "dateStn",
    //   headerName: "date de soutenance",
    //   width: 170,
    //   headerAlign: "center",
    // },
    // { field: "rapport", headerName: "Rapport", width: 260 },
    // { field: "remarque", headerName: "Remarque", width: 320 },
    {
      field: "action",
      headerName: "Action",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 70,
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <CancelIcon
              className="deleteButtonChefDep"
              onClick={() => {
                popup(params.row.id);
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
    Axios.get(`http://localhost:3001/pfeOfStd/${id_user}`).then((response) => {
      if (mounted) {
        setPfeList(response.data);
      }
    });
    return () => {
      mounted = false;
    };
  }, [id_user]);

  //POP-UP delete confirmation!
  const deleteDemande = (id) => {
    Axios.delete(`http://localhost:3001/deleteDemande/${id}`).then(() => {
      Axios.get(`http://localhost:3001/pfeOfStd/${id_user}`).then(
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
      confirmButtonText: "Oui, annuler la demande",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteDemande(id);
        Swal.fire("Annulée!", "La demande a été annulée.", "success");
      }
    });
  }

  return (
    <div className="list">
      <SidebarPStd />
      <div className="listContainer">
        <NavbarStudent />
        <div className="dataTable">
          <span>Liste de mes postulations</span>
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

export default Postul;
