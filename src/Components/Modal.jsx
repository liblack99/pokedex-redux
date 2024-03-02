import React from "react";

function Modal({ children }) {
  return (
    <div className="fixed grid place-content-center w-full h-full bg-[#00000080]">
      {children}
    </div>
  );
}

export default Modal;
