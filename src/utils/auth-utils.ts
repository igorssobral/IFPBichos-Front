import { getLocalStorage } from "./local-storage";

export const getToken = () => {
  return getLocalStorage() !== null && getLocalStorage().token;
};
