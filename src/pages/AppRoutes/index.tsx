import React from 'react';
import { BrowserRouter as Router, Route, Routes,  } from 'react-router-dom';

import { Home } from '../home';
import { CreateCampanha } from '../campanha/createCampanha';
import { Login } from '../login';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login"  element={<Login/>} />
        <Route path="/"  element={<Home/>} />
        <Route path="/createcampanha" element={<CreateCampanha/>} />
        
      </Routes>
    </Router>
  );
};

export default AppRouter;
