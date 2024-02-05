import "./listStudent.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Axios from "axios";

const ListStudent = () => {
  const id = Cookies.get("filId");

  const columns = [
    // { field: "id", headerName: "ID", width: 60 },
    { field: "firstName", headerName: "Nom", headerAlign: "center", width: 140 },
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
      width: 170,
    },
    // { field: "pfe", headerName: "PFE", headerAlign: "center", width: 80 }, //if he has a pfe or no (oui / non)
    {
      field: "action",
      headerName: "Action",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 130,
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={"/chefdepartement/studentInfo/" + params.row.id}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">Voir détails</div>
            </Link>
          </div>
        );
      },
    },
  ];

  //grab data from the DB & display them in our page
  const [projectsList, setProjectList] = useState([]);

  //fetch data from the server to display them in our page
  useEffect(() => {
    let mounted = true;
    Axios.get(`http://localhost:3001/stdListe/${id}`).then((response) => {
      if (mounted) {
        setProjectList(response.data);
      }
    });
    return () => {
      mounted = false;
    };
  }, [id]);

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <div className="dataTable">
          <span>Liste des étudiants</span>
          <div style={{ height: 515, width: "100%" }}>
            <DataGrid
              rows={projectsList}
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

export default ListStudent;
