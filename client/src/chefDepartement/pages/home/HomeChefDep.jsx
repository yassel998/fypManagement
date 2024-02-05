import DonutChart from "../../components/donutChart/DonutChart";
import Navbar from "../../components/navbar/Navbar";
import OtherChart from "../../components/otherChart/OtherChart";
import Sidebar from "../../components/sidebar/Sidebar";
import Widget from "../../components/widget/Widget";
import "./homeChefDep.scss";

export default function Home() {
  return (
    <div className="homeChefDep">
      <Sidebar />
      <div className="homeContainerChefDep">
        <Navbar />
        <div className="widgetsChefDep">
          <Widget type="prof" />
          <Widget type="student" />
          <Widget type="pfe" />
          <Widget type="domaine" />
        </div>
        <div className="chartsChefDep">
          <DonutChart />
          <OtherChart />
        </div>
      </div>
    </div>
  );
}
