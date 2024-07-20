/* eslint-disable @typescript-eslint/no-explicit-any */

import { UserLogged } from '../services/@types/auth';

export const setLocalStorage = (key: string, value: any): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorage = (key: string): UserLogged | null => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
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


