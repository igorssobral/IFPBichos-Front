import React from "react";
import "./App.css";
import { Navbar } from "./components/layout/navbar";
import { Login } from "./pages/login";
import { CreateCampanha } from "./pages/campanha/createCampanha";
import { EditCampanha } from "./pages/campanha/editCampanha";
import { Home } from "./pages/home";


function App() {
  return (
    <div>
      <Navbar visible={true} title=""></Navbar>
      {/* <CreateCampanha/> */}
      {/* <EditCampanha/> */}
      {/* <Login /> */}
      <Home/>
    </div>
  );
}

export default App;
