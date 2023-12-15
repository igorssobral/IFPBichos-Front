export type Credentials = {
  email: string;
  password: string;
};

export type User = {
  name: string;
  phone: string;
  email: string;
  login: string;
  password: string;
};

export type UserDataBase = {
  [key: string]: {
    name: string;
    phone: string;
    email: string;
    login: string;
    password: string;
  };
};
