import React from 'react';
import { BrowserRouter as Router, Route, Routes,Navigate  } from 'react-router-dom';

import { Home } from '../home';
import { CreateCampanha } from '../campanha/createCampanha';
import { Login } from '../sign-in';
import { EditCampanha } from '../campanha/editCampanha';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login"  element={<Login/>} />
        <Route path="/"  element={<Navigate to={"/login"}/>} />
        <Route path="/campanhas"  element={<Home/>} />
        <Route path="/createcampanha" element={<CreateCampanha/>} />
        <Route path="/editcampanha" element={<EditCampanha/>} />
        
      </Routes>
    </Router>
  );
};

export default AppRouter;
