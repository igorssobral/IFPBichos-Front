import React, { createContext, useContext, useEffect, useState } from 'react';

import { UserLogged } from '../services/@types/auth';
import {
  isAuthenticated,
  removeLocalStorage,
  setLocalStorage,
} from '../utils/local-storage';
import { decodeJwt } from '../utils/decode-jwt';
import { isValidToken } from '../services/auth';

interface AuthContextType {
  user: UserLogged | null;
  logged: (userData: UserLogged) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserLogged | null>(isAuthenticated());

  const logged = (userData: UserLogged) => {
    setLocalStorage('user', userData);

    const decoded = decodeJwt(userData.token);
    setUser({
      token: userData.token,
      user: decoded.sub || '',
      userRole: decoded.role,
    });
  };

  const logout = () => {
    setLocalStorage('user', null);
    removeLocalStorage('welcomeShown');
    setUser(null);
  };

  useEffect(() => {
    const authUser = isAuthenticated();
  
    if (!authUser) {
      logout(); 
      return;
    }
  
    const verifyTokenIsValid = async () => {
      try {
        const tokenValid = await isValidToken(); 
  
        if (!tokenValid) {
          logout(); 
        } else {
          setUser(authUser); 
        }
      } catch (error) {
       
        logout(); 
      }
    };
  
    verifyTokenIsValid();
  }, []);

  return (
    <AuthContext.Provider value={{ user, logged, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
