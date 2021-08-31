import React, { useState } from 'react';
import Hamburger from './Hamburger.jsx';
//eventual plan is to render hamburger based on whether or not 'menu' prop is set to true

const Footer = ({menu}) => {
  return (
    <div className="grid grid-rows-1 grid-cols-1 gap-0 justify-self-end items-end">
      {menu && <Hamburger />}
    </div>
  );
};

export default Footer;
