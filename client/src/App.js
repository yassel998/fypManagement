import HomeChefDep from "./chefDepartement/pages/home/HomeChefDep";
import ListPfe from "./chefDepartement/pages/listPfe/ListPfe";
import SinglePfe from "./chefDepartement/pages/singlePfe/SinglePfe";
import NewPfe from "./chefDepartement/pages/newPFE/NewPfe";
import MyPfe from "./chefDepartement/pages/myPfe/MyPfe";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListProf from "./chefDepartement/pages/listProf/ListProf";
import ListStudent from "./chefDepartement/pages/listStudent/ListStudent";
import Domaine from "./chefDepartement/pages/domaine/Domaine";
import Prerequi from "./chefDepartement/pages/prerequi/Prerequi";
import Profile from "./chefDepartement/pages/profile/Profile";
import Login from "./login&Register/login/Login";
import HomeProf from "./Prof/pages/home/HomeProf";
import MyPfeProf from "./Prof/pages/myPfe/MyPfeProf";
import PfeStudent from "./chefDepartement/pages/pfeStudent/PfeStudent";
import Register from "./login&Register/register/Register";
import HomeAdmin from "./admin/pages/home/HomeAdmin";
import ListProfAdmin from "./admin/pages/listProfAdmin/ListProfAdmin";
import ListChefDep from "./admin/pages/listChefDep/ListChefDep";
import NewAccount from "./admin/pages/newAccount/NewAccount";
import HomeStudent from "./student/pages/home/HomeStudent";
import StdProfile from "./student/pages/stdProfile/StdProfile";
import ListPfeStd from "./student/pages/listPfe/ListPfeStd";
import Details from "./student/pages/detailsPfe/Details";
import PrivateRoute from "./privateRoute/PrivateRoute";
import ProfProfile from "./Prof/pages/profile/ProfProfile";
import PrivateRouteProf from "./privateRoute/PrivateRouteProf";
import PrivateRouteAdmin from "./privateRoute/PrivateRouteAdmin";
import PrivateRouteStd from "./privateRoute/PrivateRouteStd";
import NewPfeProf from "./Prof/pages/newPfe/NewPfeProf";
import SinglePfeProf from "./Prof/pages/singlePfe/SinglePfeProf";
import DomaineProf from "./Prof/pages/domaine/DomaineProf";
import PrerequiProf from "./Prof/pages/prerequi/PrerequiProf";
import NewFiliere from "./admin/pages/newFiliere/NewFiliere";
import Demandes from "./chefDepartement/pages/demandes/Demandes";
import DetailsStd from "./chefDepartement/pages/detailsStd/DetailsStd";
import SingleOtherPfe from "./chefDepartement/pages/singleOtherPfe/SingleOtherPfe";
import PageNotFound from "./pageNotFound/PageNotFound";
import ListStudentAdmin from "./admin/pages/listStudent/ListStudentAdmin";
import ListStdActivated from "./admin/pages/listStdActivated/ListStdActivated";
import StudentProf from "./Prof/pages/students/StudentsProf";
import SingleStudent from "./Prof/pages/singleStudent/SingleStudent";
import DemandesProf from "./Prof/pages/demandes/DemandesProf";
import PfeStudentProf from "./Prof/pages/pfeStudent/PfeStudentProf";
import Postul from "./student/pages/listPostul/Postul";
import MyPfeStd from "./student/pages/myPfe/MyPfeStd";
// import StdPre from "./student/pages/prerequis/StdPre";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} exact />
          <Route path="/register" element={<Register />} />
          <Route path="/*" element={<PageNotFound />} />

          <Route path="chefdepartement" element={<PrivateRoute />}>
            <Route path="home" element={<HomeChefDep />} />
            <Route path="pfe" element={<ListPfe />} />
            <Route path="myPfe" element={<MyPfe />} />
            <Route path="myPfe/:pfeId" element={<SinglePfe />} />
            <Route path="new" element={<NewPfe />} />
            <Route path="prof" element={<ListProf />} />
            <Route path="student" element={<ListStudent />} />
            <Route path="domaine" element={<Domaine />} />
            <Route path="prerequis" element={<Prerequi />} />
            <Route path="profile" element={<Profile />} />
            <Route path="pfeStudent" element={<PfeStudent />} />
            <Route path="demandes" element={<Demandes />} />
            <Route path="studentInfo/:idStd" element={<DetailsStd />} />
            <Route path="otherPfe/:pfeId" element={<SingleOtherPfe />} />
          </Route>

          <Route path="prof" element={<PrivateRouteProf />}>
            <Route path="home" element={<HomeProf />} />
            <Route path="pfe" element={<MyPfeProf />} />
            <Route path="profile" element={<ProfProfile />} />
            <Route path="newPfe" element={<NewPfeProf />} />
            <Route path="myPfe/:pfeId" element={<SinglePfeProf />} />
            <Route path="domaine" element={<DomaineProf />} />
            <Route path="prerequi" element={<PrerequiProf />} />
            <Route path="student" element={<StudentProf />} />
            <Route path="studentInfo/:idStd" element={<SingleStudent />} />
            <Route path="demandes" element={<DemandesProf />} />
            <Route path="pfeStudent" element={<PfeStudentProf />} />
          </Route>

          <Route path="admin" element={<PrivateRouteAdmin />}>
            <Route path="home" element={<HomeAdmin />} />
            <Route path="prof" element={<ListProfAdmin />} />
            <Route path="chefDep" element={<ListChefDep />} />
            <Route path="student" element={<ListStudentAdmin />} />
            <Route path="studentAct" element={<ListStdActivated />} />
            <Route path="newAccount" element={<NewAccount />} />
            <Route path="newFiliere" element={<NewFiliere />} />
          </Route>

          <Route path="student" element={<PrivateRouteStd />}>
            <Route path="home" element={<HomeStudent />} />
            <Route path="profile" element={<StdProfile />} />
            <Route path="pfe" element={<ListPfeStd />} />
            <Route path="details/:pfeId" element={<Details />} />
            <Route path="postul" element={<Postul />} />
            <Route path="mypfe" element={<MyPfeStd />} />
            {/* <Route path="prerequis" element={<StdPre />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
