import React from 'react';
import { useEffect } from 'react';
import macdonaldsLogo from '../asses/not-found/logo-removebg-preview.png'

function Error({setVisibilityClientFrontend}) {



    useEffect(() => {
      
        setVisibilityClientFrontend(false);
    
    }, []);


  return (
    <div className="error-container">
      <div className='container-img-error'>
<img  />
      </div>
      <div className="error-text">
      LO SENTIMOS, USTED NO CUENTA CON LOS PERMISOS PARA INGRESAR A ESTE ENLACE
      </div>
      <img className="error-image" alt="Error" src={macdonaldsLogo} />
    </div>
  );
}

export default Error;