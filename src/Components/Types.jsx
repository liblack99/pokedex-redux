import React from "react";

function Types({ name, types }) {
  return (
    <span className="ground relative hover-class  p-1 text-md rounded px-2 py-0.5 flex items-center">
      <img className="w-[40px]" src={types} alt={name} />
      <i className="absolute left-10 -top-4 chill-i">{name}</i>
    </span>
  );
}

export default Types;
