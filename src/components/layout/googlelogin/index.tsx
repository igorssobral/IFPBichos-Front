import React from 'react';

import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';



export const GoogleAuth = () => {
  const responseGoogle = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    console.log(response);
    // Aqui você pode lidar com a resposta, como enviar para o servidor para autenticação.
  };
  return (
    <div>
      
      <GoogleLogin
        clientId={"781514527068-60flqfqet3un3uk1sav6gchg32vogtc3.apps.googleusercontent.com" || ''}
        buttonText="Entrar com o Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
       	
      />
    </div>
  )
}


