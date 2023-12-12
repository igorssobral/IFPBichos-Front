import React from "react";
import "./App.css";
import { Navbar } from "./components/layout/navbar";
import { Login } from "./pages/login";
import { CreateCampanha } from "./pages/campanha/createCampanha";

function App() {
  return (
    <div>
      <Navbar visible={true} title=""></Navbar>
      <CreateCampanha/>
      {/* <Login /> */}
    </div>
  );
}

export default App;
