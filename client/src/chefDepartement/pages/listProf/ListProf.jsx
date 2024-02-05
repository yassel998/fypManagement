import "./listProf.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import Axios from "axios";
import Cookies from "js-cookie";

const ListProf = () => {
  const id = Cookies.get("filId");

  //temporary
  const columns = [
    { field: "lastName", headerName: "Nom", headerAlign: "center", width: 170 },
    {
      field: "firstName",
      headerName: "Prénom",
      headerAlign: "center",
      width: 170,
    },
    {
      field: "email",
      headerName: "Email",
      headerAlign: "center",
      width: 300,
      // flex: 1,
    },
    {
      field: "phone",
      headerName: "Téléphone",
      headerAlign: "center",
      width: 160,
      // flex: 1,
    },
    {
      field: "filiere",
      headerName: "filière",
      headerAlign: "center",
      width: 200,
    },
    // {
    //   field: "pfe",
    //   headerName: "PFE's",
    //   headerAlign: "center",
    //   width: 130,
    //   // flex: 1,
    // },
  ];

  //grab data from the DB & display them in our page
  const [profList, setProfList] = useState([]);
  //fetch data from the server to display them in our page
  useEffect(() => {
    let mounted = true;
    Axios.get(`http://localhost:3001/prof/${id}`).then((response) => {
      if (mounted) {
        setProfList(response.data);
      }
    });
    return () => {
      mounted = false;
    };
  }, [id]);

  console.log(profList);

  return (
    <div className="listProf">
      <Sidebar />
      <div className="listProfContainer">
        <Navbar />
        <div className="dataTableProf">
          <span>Liste des professeurs</span>
          <div style={{ height: 515, width: "100%" }}>
            <DataGrid
              rows={profList}
              columns={columns}
              pageSize={10}
              autoPageSize
              rowsPerPageOptions={[11]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListProf;
