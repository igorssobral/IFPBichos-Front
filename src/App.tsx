import React from "react";
import "./App.css";
import { Navbar } from "./components/layout/navbar";
import { Login } from "./pages/login";

function App() {
  return (
    <div>
      <Navbar visible={true} title=""></Navbar>
      <Login />
    </div>
  );
}

export default App;
