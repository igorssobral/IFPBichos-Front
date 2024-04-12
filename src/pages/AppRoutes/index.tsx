import { Navigate, Route, Routes } from "react-router";

import { CreateCampanha } from "../campanha/createCampanha";
import { EditCampanha } from "../campanha/editCampanha";
import { Home } from "../home";
import { Login } from "../sign-in";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import SignUp from "../sign-up";
import ViewCampanha from "../campanha/viewCampanha";
import { getLocalStorage } from "../../utils/local-storage";

const AppRouter = () => {
  const isAuthenticated = getLocalStorage();
  const isAdmin = isAuthenticated?.userRole == "ADMIN";

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/campanhas" />} />
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/campanhas" /> : <Login />}
        />
        <Route
          path="/signUp"
          element={isAuthenticated ? <Navigate to="/signup" /> : <SignUp />}
        />
        <Route path="/campanhas" element={<Home />} />
        <Route path="/view-campaign/:obj" element={<ViewCampanha />} />
        <Route
          path="/createcampanha"
          element={
            isAdmin ? <CreateCampanha /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/editcampanha/:id"
          element={
            isAdmin ? <EditCampanha /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
