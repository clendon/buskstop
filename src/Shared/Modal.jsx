import React, { useState } from 'react';

const Modal = ({ show }) => (
  !show ? null
    : (<dialog className="z-40 fixed bg-white">props.children</dialog>)
);

export default Modal;
