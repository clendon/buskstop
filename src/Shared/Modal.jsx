import React, { useState } from 'react';
// in order to make this modal close, you need to pass it an onClick that does so!

const Modal = ({children, onClick}) => (
  <dialog className="z-50 absolute border border-yellow-600 h-3/4 w-3/4 flex flex-col justify-evenly items-center rounded " open>
    {children}
    <button onClick={onClick} className="border-2 absolute bottom-1 right-1 rounded border-yellow-600 p-0.5 bg-yellow-600">Close</button>
  </dialog>
);

export default Modal;
