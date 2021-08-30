import React, { useState } from 'react';
import Hamburger from './Hamburger.jsx';
//eventual plan is to render hamburger based on whether or not 'menu' prop is set to true

const Footer = ({menu}) => {
  return (
    <div className="border border-black w-full flex justify-self-end justify-center">
      {menu && <Hamburger />}
    </div>
  );
};

export default Footer;
