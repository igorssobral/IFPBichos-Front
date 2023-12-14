import axios, { AxiosInstance } from "axios";

// import StorageService from "./StorageService";

export const LOGGED_USER = 'loggedUser';
export const TOKEN = 'token';

// const baseURL = process.env.REACT_APP_API_URL;

interface ApiService {
  (endpoint: string): {
    post: (url: string, params: any) => Promise<any>;
    put: (url: string, params: any) => Promise<any>;
    delete: (url: string) => Promise<any>;
    get: (url: string) => Promise<any>;
  };
}

const createApiService: ApiService = (endpoint: string) => {
//   const storageService = new StorageService();

  const httpClient: AxiosInstance = axios.create({
    baseURL: "http://localhost:8080/",
    withCredentials: true,
  });

  const registerToken = (token: string | null): void => {
    if (token) {
      httpClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  };

  const post = (url: string, params: any): Promise<any> => {
    url = buildUrl(url);   
    console.log("🚀 ~ file: ApiService.ts:35 ~ post ~ url:", url)
    return httpClient.post(url, params);
    
  };

  const put = (url: string, params: any): Promise<any> => {
    url = buildUrl(url);
    return httpClient.put(url, params);
  };

  const del = (url: string): Promise<any> => {
    url = buildUrl(url);
    return httpClient.delete(url);
  };

  const get = (url: string): Promise<any> => {
    url = buildUrl(url);
    return httpClient.get(url);
  };

  const buildUrl = (url: string): string => {
    return `${endpoint}${url}`;
  };

//   const token = storageService.getItem(TOKEN);
//   registerToken(token);

  return { post, put, delete: del, get };
};

export default createApiService;