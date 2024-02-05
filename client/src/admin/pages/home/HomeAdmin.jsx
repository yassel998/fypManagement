import BarChart from "../../components/barChart/BarChart";
import NavbarAdmin from "../../components/navbar/NavbarAdmin";
import SidebarAdmin from "../../components/sidebar/SidebarAdmin";
import Widget from "../../components/widget/WidgetAdmin";
import "./homeAdmin.scss";

export default function HomeAdmin() {
  return (
    <div className="homeAdmin">
      <SidebarAdmin />
      <div className="homeContainerAdmin">
        <NavbarAdmin />
        <div className="widgetsAdmin">
          <Widget type="prof" />
          <Widget type="chefDep" />
          <Widget type="student" />
        </div>
        <div className="chartsAdmin">
          <BarChart />
        </div>
      </div>
    </div>
  );
}
