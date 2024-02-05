import "./myPfe.scss";
import SidebarStd from "../../components/sidebar/SidebarStd";
import NavbarStudent from "../../components/navbar/NavbarStudent";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Axios from "axios";
import Swal from "sweetalert2";

const ListPfeStd = () => {
  const id_fil = Cookies.get("filId");
  const id_user = Cookies.get("userId");
  // const [test, setTest] = useState();

  const addDemande = (id, idProf) => {
    Axios.post("http://localhost:3001/addDemande", {
      id_pfe: id,
      id_user: id_user,
      id_prof: idProf,
    }).then(() => {
      // console.log("success!");
      // alert("success!");
    });
  };
  function popup(id, pname, idProf) {
    Swal.fire({
      title: "Êtes vous sûr?",
      text: "Vous voulez postuler au  " + pname + " ?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Annuler",
      confirmButtonText: "Oui, postuler au " + pname,
    }).then((result) => {
      if (result.isConfirmed) {
        addDemande(id, idProf);
        Swal.fire("Postulé!", "Vous avez postulé au PFE.", "success");
      }
    });
  }
  //temporary
  const columns = [
    { field: "titre", headerName: "Titre", headerAlign: "center", width: 520 },
    {
      field: "fname",
      headerName: "Prof",
      headerAlign: "center",
      width: 190,
    },
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
      width: 180,
    },

    {
      field: "action",
      headerName: "Action",
      headerAlign: "center",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 70,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              className="viewButton"
              onClick={() => {
                popup(params.row.id, params.row.titre, params.row.idProf);
              }}
            >
              Postuler
            </div>
            <Link
              to={"/student/details/" + params.row.id}
              style={{ textDecoration: "none" }}
            >
              <div className="detailsButton">Détails</div>
            </Link>
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
    Axios.get(`http://localhost:3001/allPfeStd/${id_fil}`).then((response) => {
      if (mounted) {
        setPfeList(response.data);
      }
    });
    return () => {
      mounted = false;
    };
  }, [id_fil]);

  return (
    <div className="list">
      <SidebarStd />
      <div className="listContainer">
        <NavbarStudent />
        <div className="dataTable">
          <div className="dataTableTitle">Liste des PFE's</div>
          <div style={{ height: 515, width: "100%", textAlign: "center" }}>
            <DataGrid
              rows={pfeList}
              columns={columns}
              pageSize={10}
              autoPageSize
              rowsPerPageOptions={[10]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListPfeStd;
