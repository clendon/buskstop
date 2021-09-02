import React, { useState } from 'react';

const Modal = ({children, onClick}) => (
  <dialog className="z-50 absolute border border-yellow-600 bg-white h-1/2 w-1/2" open onClick={onClick}>{children}</dialog>
);

export default Modal;
