import React from 'react';
// import Signin from '../Signin/Signin';

const Navigation = ({ onRouteChange, isSingnedIn }) => {

  if (isSingnedIn) {
    return (
      <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <p onClick={() => onRouteChange('signout')} className='f3 link dim black underline pa3 pointer'>Sing Out</p>
      </nav>
    );

  } else {
    return (
      <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <p onClick={() => onRouteChange('signin')} className='f3 link dim black underline pa3 pointer'>Sing in</p>
        <p onClick={() => onRouteChange('registrer')} className='f3 link dim black underline pa3 pointer'>Resgrister</p>
      </nav>
     
      );
  }

}

export default Navigation