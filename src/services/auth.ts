import axios from "axios";
import { Credentials } from "./@types/auth";

export const login = async (credentials: Credentials): Promise<any> => {
  const URL = import.meta.env.VITE_APP_DB_URL;
  try {
    const response = await axios.post(`${URL}/auth/login`, credentials);

    localStorage.setItem("user", JSON.stringify(response.data));

    return response.data;
  } catch (error) {
    throw error;
  }
};


export const signup = async (credentials: any): Promise<any> => {
  const URL = import.meta.env.VITE_APP_DB_URL;
  try {
    const response = await axios.post(`${URL}/auth/userRegistration`, credentials);

  

    return response.data;
  } catch (error) {
    throw error;
  }
};
