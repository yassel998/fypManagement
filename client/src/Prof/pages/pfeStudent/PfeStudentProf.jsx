import NavbarProf from "../../components/navbar/NavbarProf";
import SidebarProf from "../../components/sidebar/SidebarProf";
import "./pfeStudentProf.scss";
import { DataGrid } from "@mui/x-data-grid";
import Axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import DateRangeIcon from "@mui/icons-material/DateRange";
import Swal from "sweetalert2";
import "flatpickr/dist/themes/material_green.css";
import flatpickr from "flatpickr";

const PfeStudentProf = () => {
  const id_user = Cookies.get("userId");

  //temporary
  const columns = [
    {
      field: "titre",
      headerName: "Titre PFE",
      headerAlign: "center",
      width: 380,
    },
    {
      field: "fname",
      headerName: "Étudiants-es",
      headerAlign: "center",
      width: 145,
    },
    {
      field: "date",
      headerName: "date d'acceptation",
      width: 155,
      headerAlign: "center",
    },
    {
      field: "nbr_etd",
      headerName: "№ étuds",
      headerAlign: "center",
      width: 75,
    },
    // { field: "rapport", headerName: "Rapport", width: 260 },
    // { field: "remarque", headerName: "Remarque", width: 320 },
    {
      field: "avancement",
      headerName: "Avancement",
      width: 110,
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
      field: "dateSoutenance",
      headerName: "Soutenance",
      headerAlign: "center",
      width: 110,
    },
    {
      field: "action",
      headerName: "Action",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 145,
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {/* <Link
              to={"/chefdepartement/etud/" + params.row.id}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">Voir plus des détails</div>
            </Link> */}
            <div
              className="desafect"
              onClick={() => {
                popup(params.row.id);
              }}
            >
              désaffecté
            </div>
            <DateRangeIcon
              className="changeAdvancement"
              onClick={() => {
                popupCal(params.row.idPfe);
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
    Axios.get(`http://localhost:3001/stdPfe/${id_user}`).then((response) => {
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
      Axios.get(`http://localhost:3001/stdPfe/${id_user}`).then((response) => {
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
      confirmButtonText: "Oui, désaffecté le pfe ",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteDemande(id);
        Swal.fire("Désaffecté!", "Le PFE désaffecté.", "success");
      }
    });
  }

  //POP-UP update date soutenance confirmation!
  const updateDateSout = (id, date) => {
    Axios.put("http://localhost:3001/updateDateSout", {
      date: date,
      id: id,
    }).then((response) => {
      // alert("updated");
      Axios.get(`http://localhost:3001/stdPfe/${id_user}`).then((response) => {
        setPfeList(response.data);
      });
    });
  };
  function popupCal(id) {
    let flatpickrInstance;
    Swal.fire({
      title: "Veuillez entrer une date pour la soutenance",
      html: '<input class="swal2-input" id="expiry-date">',
      stopKeydownPropagation: false,
      position: "top",
      preConfirm: () => {
        if (flatpickrInstance.selectedDates[0] < new Date()) {
          Swal.showValidationMessage(`La date ne peut pas être dans le passé`);
        }
      },
      willOpen: () => {
        flatpickrInstance = flatpickr(
          Swal.getPopup().querySelector("#expiry-date"),
          {
            // dateFormat: "d-m-y",
          }
        );
      },
    }).then(function (result) {
      if (result.isConfirmed) {
        updateDateSout(
          id,
          flatpickrInstance.selectedDates[0].toLocaleDateString("en-GB")
        );
        Swal.fire({
          icon: "success",
          html:
            "Date de soutenance: " +
            flatpickrInstance.selectedDates[0].toLocaleDateString("en-GB"),
        });
      }
    });
  }
  return (
    <div className="list">
      <SidebarProf />
      <div className="listContainer">
        <NavbarProf />
        <div className="dataTable">
          <span>Liste des pfe/étudiants</span>
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

export default PfeStudentProf;
