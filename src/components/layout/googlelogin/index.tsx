import React from "react";

import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";

export const GoogleAuth = () => {
  const responseGoogle = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    console.log(response);
  };
  return (
    <div>
      <GoogleLogin
        clientId={import.meta.env.VITE_APP_GOOGLE_CLIENT_ID}
        buttonText="Entrar com o Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
};
