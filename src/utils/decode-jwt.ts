import { jwtDecode, JwtPayload } from 'jwt-decode';

interface CustomJwtPayload extends JwtPayload {
  role: string; 
}

export const decodeJwt = (token: string): CustomJwtPayload => {
  const decoded = jwtDecode<CustomJwtPayload>(token);
  return decoded;
};
