import React from 'react';
import './App.css';
import AppRouter from './pages/AppRoutes';
import { AuthProvider } from './context/auth-context';
import { Bounce, ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className='App'>
      <AuthProvider>
        <AppRouter />
        <ToastContainer
          position='top-right'
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='light'
          transition={Bounce}
        />
      </AuthProvider>
    </div>
  );
}

export default App;
