import NavbarStudent from "../../components/navbar/NavbarStudent";
import SidebarPStd from "../../components/sidebar/SidebarStd";
import "./myPfeStd.scss";
import { DataGrid } from "@mui/x-data-grid";
import Axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
// import CancelIcon from "@mui/icons-material/Cancel";
// import Swal from "sweetalert2";

const MyPfeStd = () => {
  const id_user = Cookies.get("userId");

  //temporary
  const columns = [
    {
      field: "titre",
      headerName: "Titre PFE",
      headerAlign: "center",
      width: 580,
    },
    {
      field: "fname",
      headerName: "Prof",
      headerAlign: "center",
      width: 155,
    },
    {
      field: "date",
      headerName: "date d'affectation",
      width: 170,
      headerAlign: "center",
    },
    {
      field: "dateSoutenance",
      headerName: "Soutenance",
      width: 120,
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
  ];

  //grab data from the DB & display them in our page
  const [pfeList, setPfeList] = useState([]);

  //fetch data from the server to display them in our page
  useEffect(() => {
    let mounted = true;
    Axios.get(`http://localhost:3001/MypfeOfStd/${id_user}`).then(
      (response) => {
        if (mounted) {
          setPfeList(response.data);
        }
      }
    );
    return () => {
      mounted = false;
    };
  }, [id_user]);


  return (
    <div className="list">
      <SidebarPStd />
      <div className="listContainer">
        <NavbarStudent />
        <div className="dataTable">
          <span>Mon PFE</span>
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

export default MyPfeStd;
