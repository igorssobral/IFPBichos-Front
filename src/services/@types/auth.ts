export type Credentials = {
  login: string;
  password: string;
};
export type ForgotasswordRequest = {
  email: string;
};
export type ResetPasswordRequest = {
  token: string;
  newPassword: string;
};

export type User = {
  name: string;
  phone: string;
  email: string;
  login: string;
  password: string;
};

export type UserLogged  ={
  token: string;
  userRole: string;
  user: string; 
}


export type UserDataBase = {
  [key: string]: {
    name: string;
    phone: string;
    email: string;
    login: string;
    password: string;
  };
};


