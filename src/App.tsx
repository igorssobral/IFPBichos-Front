import React from "react";
import "./App.css";
import { Navbar } from "./components/layout/navbar";
import { Login } from "./pages/login";
import { CreateCampanha } from "./pages/campanha/createCampanha";
import { EditCampanha } from "./pages/campanha/editCampanha";
import { Home } from "./pages/home";
import AppRouter from "./pages/AppRoutes";

function App() {
  return (
    <div className="App">
      {/* <Navbar visible={false} visibleMenu={false} title=""></Navbar> */}
      <AppRouter/>
    </div>
  );
}

export default App;
