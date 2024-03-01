import React from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { setFilter } from "../actions";
import { memo } from "react";
import { ALL } from "../actions/types";

const SelectTypes = () => {
  const types = useSelector((state) => state.types, shallowEqual);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    dispatch(setFilter(event.target.value));
  };

  return (
    <form className="w-[300px] mt-4 ">
      <label className="sr-only">Underline select</label>
      <select
        id="underline_select"
        className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-blue-400 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
        onChange={handleChange}>
        <option value={ALL}>All</option>
        {types.map((type) => (
          <option key={type.name} value={type.name}>
            {type.name}
          </option>
        ))}
      </select>
    </form>
  );
};

export default SelectTypes;
