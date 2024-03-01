import React from "react";

export default function Layout({ children }) {
  return (
    <div className="w-full h-full flex flex-col items-center">{children}</div>
  );
}
