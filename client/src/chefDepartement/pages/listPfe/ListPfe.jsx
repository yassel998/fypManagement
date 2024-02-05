import "./listPfe.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Axios from "axios";

const ListPfe = () => {
  const id_fil = Cookies.get("filId");

  //grab data from the DB & display them in our page
  const [pfeList, setPfeList] = useState([]);

  //fetch data from the server to display them in our page
  useEffect(() => {
    let mounted = true;
    Axios.get(`http://localhost:3001/allPfe/${id_fil}`).then((response) => {
      if (mounted) {
        setPfeList(response.data);
      }
    });
    return () => {
      mounted = false;
    };
  }, [id_fil]);

  console.log(pfeList);
  //temporary
  const columns = [
    { field: "titre", headerName: "Titre", headerAlign: "center", width: 480 },
    { field: "fname", headerName: "Prof", headerAlign: "center", width: 165 },
    {
      field: "nbr_etd",
      headerName: "№ étuds",
      headerAlign: "center",
      width: 90,
    },
    // {
    //   field: "nbr_etd_pfe",
    //   headerName: "№",
    //   headerAlign: "center",
    //   width: 80,
    // },

    {
      field: "avancement",
      headerName: "Avancement",
      width: 130,
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
      width: 135,
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={"/chefdepartement/otherPfe/" + params.row.id}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">Voir plus des détails</div>
            </Link>
          </div>
        );
      },
      flex: 1,
    },
  ];

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <div className="dataTable">
          <span>Liste des PFE's</span>
          <div style={{ height: 515, width: "100%" }}>
            <DataGrid
              rows={pfeList}
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

export default ListPfe;
