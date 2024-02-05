import "./donutChart.scss";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import { useEffect, useState } from "react";
import Axios from "axios";
import Cookies from "js-cookie";

const DonutChart = () => {
  const id = Cookies.get("userId");

  const [profList, setProfList] = useState([]);
  //grab data from the DB & display them in our page
  useEffect(() => {
    let mounted = true;
    Axios.get(`http://localhost:3001/chefDepadv/${id}`).then((response) => {
      if (mounted) {
        setProfList(response.data);
      }
    });
    return () => {
      mounted = false;
    };
  }, [id]);

  const data = {
    labels: profList.map((data) => data.avancement),
    datasets: [
      {
        label: "Avancements",
        data: profList.map((data) => data.num),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="donutChart">
      <div className="top">
        <div className="title">
          <h3>L'avancements de mes PFE's</h3>
        </div>
      </div>
      <div className="bottom">
        <div className="donut">
          <Doughnut data={data} />
        </div>
      </div>
    </div>
  );
};

export default DonutChart;
