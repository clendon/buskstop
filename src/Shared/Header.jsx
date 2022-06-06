import React, { useState } from 'react';
import Hamburger from './Hamburger.jsx'

//border border-black
// classNames cut from this because I don't think it needs them but this is Sean's component

const Header = ({menu}) => {
  return (
    <div className="w-full hidden bg-yellow-600 lg:flex lg:h-16 lg:fixed lg:justify-end" >
      {menu && <Hamburger />}
    </div>
  );
};

export default Header;
