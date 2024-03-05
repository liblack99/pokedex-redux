import React from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { setFilterType } from "../slices/pokemonSlice";
import { ALL, FAVORITES } from "../const";

const SelectTypes = () => {
  const typesList = useSelector((state) => state.typesList, shallowEqual);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    dispatch(setFilterType(event.target.value));
  };

  return (
    <form className="w-[300px] mt-4 ">
      <label className="sr-only">Underline select</label>
      <select
        id="underline_select"
        className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-blue-400 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
        onChange={handleChange}>
        <option value={ALL}>All</option>
        <option value={FAVORITES}>Favorites</option>
        {typesList.map((type) => (
          <option key={type.name} value={type.name}>
            {type.name}
          </option>
        ))}
      </select>
    </form>
  );
};

export default SelectTypes;
