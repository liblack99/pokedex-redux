import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {setFilterPokemonType} from "../slices/pokemonSlice";
import {ALL, FAVORITES} from "../const";

const SelectTypes = ({setFilter}) => {
  const typesList = useSelector((state) => state.typesList);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const selectedType = event.target.value;
    dispatch(setFilterPokemonType(selectedType));
    setFilter(selectedType);
  };

  return (
    <form className="w-[300px] mt-4 ">
      <label className="sr-only">Underline select</label>
      <select
        id="underline_select"
        className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-blue-400 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
        onChange={handleChange}>
        <option value={ALL}>All</option>
        <option value={FAVORITES}>{FAVORITES}</option>
        {typesList.map((type) => (
          <option key={type.name} value={type.name}>
            {type.name.toUpperCase()}
          </option>
        ))}
      </select>
    </form>
  );
};

export default SelectTypes;
