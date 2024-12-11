/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { UserLogged } from '../services/@types/auth';
import { decodeJwt } from './decode-jwt';

export const setLocalStorage = (key: string, value: any): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorage = (key: string): UserLogged | null => {
  const value = localStorage.getItem(key);
  
  if (value) {
    try {
      const data = JSON.parse(value);
      if (data?.token) {
        const decoded = decodeJwt(data.token);
        if (decoded) {
          return {
            token: data.token,
            user: decoded.sub || '',
            userRole: decoded.role || '',
          };
        }
      }
    } catch (error) {
      
    }
  }

  return null;
};


export const removeLocalStorage = (key: string): void => {
  localStorage.removeItem(key);
};

export const isAuthenticated = (): UserLogged | null => {
  const user = getLocalStorage('user');
  return user && user.token ? user : null;
};

export const setWelcomeShown = (): void => {
  localStorage.setItem('welcomeShown', 'true');
};

export const isWelcomeShown = (): boolean => {
  return localStorage.getItem('welcomeShown') === 'true';
};
