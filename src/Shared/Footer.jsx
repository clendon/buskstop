import React, { useState } from 'react';
import Hamburger from './Hamburger.jsx';
//eventual plan is to render hamburger based on whether or not 'menu' prop is set to true

const Footer = ({menu}) => {
  return (
    <div className="grid grid-rows-1 grid-cols-1 gap-0 justify-self-end items-end justify-items-end bg-yellow-600 fixed bottom-0 right-0 w-full lg:h-16">
      {menu && <Hamburger hidden={'lg:hidden'} />}
    </div>
  );
};

export default Footer;
