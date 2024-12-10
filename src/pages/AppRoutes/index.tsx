import { Navigate, Route, Routes } from 'react-router';

import { CreateCampanha } from '../campanha/createCampanha';
import { EditCampanha } from '../campanha/editCampanha';
import { Home } from '../home';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import SignUp from '../sign-up';
import ViewCampanha from '../campanha/viewCampanha';
import { useAuth } from '../../context/auth-context';
import { DonationHistory } from '../donationHistory';
import ResourcesApplication from '../resourcesAplication';
import { Login } from '../sign-in';
import { RecoveryPassword } from '../recoveryPassword';
import { ResetPassword } from '../resetPassword';

const AppRouter = () => {
  const { user } = useAuth();
  const isAdmin = user?.userRole === 'ADMIN';

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Navigate to='/campanhas' />} />
        <Route
          path='/login'
          element={user ? <Navigate to='/campanhas' /> : <Login />}
        />
        <Route path='/recovery-password' element={<RecoveryPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route
          path='/signUp'
          element={user ? <Navigate to='/signup' /> : <SignUp />}
        />
        <Route path='/campanhas' element={<Home />} />
        <Route path='/view-campaign/:id' element={<ViewCampanha />} />
        <Route
          path='/createcampanha'
          element={isAdmin ? <CreateCampanha /> : <Navigate to='/login' />}
        />
        <Route
          path='/editcampanha/:id'
          element={isAdmin ? <EditCampanha /> : <Navigate to='/login' />}
        />

        <Route path='/donation-history' element={<DonationHistory />} />
        <Route
          path='/resources-aplication'
          element={<ResourcesApplication />}
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
