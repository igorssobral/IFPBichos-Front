import React from "react";
import { Route, Routes, Navigate } from "react-router";

import { BrowserRouter as Router } from "react-router-dom";

import { Home } from "../home";
import { CreateCampanha } from "../campanha/createCampanha";
import { Login } from "../sign-in";
import { EditCampanha } from "../campanha/editCampanha";
import { getLocalStorage } from "../../utils/local-storage";

const AppRouter = () => {
  const isAuthenticated = getLocalStorage();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/campanhas" />} />
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/campanhas" /> : <Login />}
        />
        <Route path="/campanhas" element={<Home />} />
        <Route
          path="/createcampanha"
          element={
            isAuthenticated ? <CreateCampanha /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/editcampanha/:id"
          element={
            isAuthenticated ? <EditCampanha /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
