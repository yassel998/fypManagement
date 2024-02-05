import "./barChart.scss";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
// import { UserData } from "./Data";
import { useEffect, useState } from "react";
import Axios from "axios";

const BarChart = () => {
  //get all prof
  const [profList, setProfList] = useState([]);
  //grab data from the DB & display them in our page
  useEffect(() => {
    let mounted = true;
    Axios.get("http://localhost:3001/profChart").then((response) => {
      if (mounted) {
        setProfList(response.data);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);
  console.log(profList);

  //temporary
  const data = {
    labels: profList.map((data) => data.name),
    datasets: [
      {
        label: "Nombre Prof",
        data: profList.map((data) => data.num),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="barChart">
      <div className="topBarChart">
        <div className="titleBarChart">
          <h3>Nombre des professeurs par filière</h3>
        </div>
      </div>
      <div className="bottomBarChart">
        <div className="bar" style={{ width: "900px", height: "450px" }}>
          <Bar data={data} height={1800} width={3500} />
        </div>
      </div>
    </div>
  );
};

export default BarChart;
