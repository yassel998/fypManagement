import NavbarStudent from "../../components/navbar/NavbarStudent";
import SidebarStd from "../../components/sidebar/SidebarStd";
import "./homeStudent.scss";

export default function HomeStudent() {
  return (
    <div className="homeAdmin">
      <SidebarStd />
      <div className="homeContainerAdmin">
        <NavbarStudent />
        <div className="widgetsAdmin">
        </div>
        <div className="chartsAdmin"></div>
      </div>
    </div>
  );
}
