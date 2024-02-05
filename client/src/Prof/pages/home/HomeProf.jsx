import NavbarProf from "../../components/navbar/NavbarProf";
import SidebarProf from "../../components/sidebar/SidebarProf";
import "./homeProf.scss";
// import Cookies from "js-cookie";
import WidgetProf from "../../components/widget/WidgetProf";
import DonutProf from "../../components/donutProf/DonutProf";

export default function HomeProf() {
  // console.log(Cookies.get("userId"));

  return (
    <div className="home">
      <SidebarProf />
      <div className="homeContainer">
        <NavbarProf />
        <div className="widgets">
          {/* <WidgetProf type="prof" /> */}
          <WidgetProf type="student" />
          <WidgetProf type="pfe" />
          <WidgetProf type="domaine" />
        </div>
        <div className="charts">
          <DonutProf/>
        </div>
      </div>
    </div>
  );
}
