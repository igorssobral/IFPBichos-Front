import React from 'react';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';

const GoogleLoginComponent: React.FC = () => {
  const responseGoogle = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    if ('profileObj' in response) {
      // console.log('ID:', response.profileObj.googleId);
      // console.log('Name:', response.profileObj.name);
      // console.log('Image URL:', response.profileObj.imageUrl);
      // console.log('Email:', response.profileObj.email);
    }
  };

  return (
    <div>
      <GoogleLogin
        clientId={import.meta.env.VITE_APP_GOOGLE_CLIENT_ID}
        buttonText="Login com Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
};

export default GoogleLoginComponent;