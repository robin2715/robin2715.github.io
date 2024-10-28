import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  NavLink,
 Navigate,
 useParams
} from "react-router-dom";
import Barnav from "./components/Frontend1/barnav/Barnav";
import { hamburguesas, drinks, desserts } from "./Variables";
import React from "react";
import Carbuy from "./components/Carbuy";
import logoMacDonalds from "./asses/not-found/logo-removebg-preview.png";
import Tables from "./components/Tables";
import Admin from "./components/AdminFrontend/Admin";
import { useNavigate } from "react-router-dom";
import Error from "./components/Error";
import { passwords } from "./Variables";
import Comprobate from "./components/Comprobate";
import Home from "./components/Home";





function App() {
  const [visibilityClientFrontend, setVisibilityClientFrontend] = useState(true)
  const [securityAdmin, setSecurityAdmin] = useState(false)

  

  return (
    <Router>
      <div className="App">
       {/* <React.Fragment>
        <Home />
       </React.Fragment> */}

        <Routes>
        <Route path="/" element={<Navigate to="/1" />} />
          <Route element={securityAdmin ? <Admin setVisibilityClientFrontend={setVisibilityClientFrontend} /> : <Error setVisibilityClientFrontend={setVisibilityClientFrontend} />} path="/admin"></Route>
          <Route element={<Error setVisibilityClientFrontend={setVisibilityClientFrontend}/>} path="/error"/>
          <Route element={<Home securityAdmin={securityAdmin} setSecurityAdmin={setSecurityAdmin} visibilityClientFrontend={visibilityClientFrontend} setVisibilityClientFrontend={setVisibilityClientFrontend} />}  path="/:tableNumber"/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
