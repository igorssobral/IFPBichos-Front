import React from 'react';
import './App.css';
import AppRouter from './pages/AppRoutes';
import { AuthProvider } from './context/auth-context';

function App() {
  return (
    <div className='App'>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </div>
  );
}

export default App;
