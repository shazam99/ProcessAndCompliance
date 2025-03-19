import './App.css';
import Nav from "./Nav/Nav";
import {BrowserRouter, Route, Router, Routes} from "react-router-dom";
import Homepage from "./Homepage/Homepage";
import Login from "./Login/Login";
import Register from "./Login/Register";
import Dashboard from "./Dashboard/Dashboard";
import BBPOUParticipationForm from "./Dashboard/Forms/BBPOUParticipationForm";
import BBPSAcessRequestFormBARF from "./Dashboard/Forms/BBPSAcessRequestFormBARF";
import SponsorBankForm from "./Dashboard/Forms/SponsorBankForm";
import Admin from "./Admin/Admin";
import Compliance from "./Compliance/Compliance";
import Marketing from "./Marketing/Marketing";

function App() {
  return (

      <BrowserRouter>
          <div className="App">
              <Nav/>
              <Routes>
                  <Route path="/" element={<Homepage/>}/>
                  <Route path="/login" element={<Login/>}/>
                  <Route path="/register" element={<Register/>}/>
                  <Route path="/dashboard" element={<Dashboard/>}/>
                  <Route path="/dashboard/form1" element={<BBPOUParticipationForm />}/>
                  <Route path="/dashboard/form2" element={<BBPSAcessRequestFormBARF />}/>
                  <Route path="/dashboard/form3" element={<SponsorBankForm />}/>
                  <Route path="/admin" element={<Admin />}/>
                  <Route path="/compliance" element={<Compliance />}/>
                  <Route path="/marketing" element={<Marketing />}/>


              </Routes>
          </div>
      </BrowserRouter>
  );
}

export default App;
