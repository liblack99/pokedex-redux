import React from "react";
import Types from "./Types";
import typeColors from "../colorTypes/colorTypes";
import { useDispatch } from "react-redux";
import { setIsModalOpen } from "../slices/pokemonSlice";

function DetailsCard({ pokemon }) {
  const types = pokemon?.types.map((type) => type.type);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setIsModalOpen(false));
  };

  const getPercentStatBar = (stat_base) => {
    const percentBarProgress = Math.floor((stat_base * 100) / 255);
    return `${percentBarProgress}%`;
  };
  return (
    <article
      className="bg-white w-[440px]  rounded-lg border-4 flex flex-col relative zoomIn "
      style={{ border: `${typeColors[types[0].name].background} 1px solid` }}>
      <span
        className="absolute text-white text-4xl font-bold -right-9 -top-6 cursor-pointer "
        onClick={handleClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-x"
          width={40}
          height={40}
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M18 6l-12 12" />
          <path d="M6 6l12 12" />
        </svg>
      </span>
      <div
        className="flex justify-between items-center bg-green-400 "
        style={{ background: typeColors[types[0].name].background }}>
        <h2 className="text-3xl font-bold pl-2">{pokemon.name}</h2>
      </div>
      <div className=" flex flex-col justify-center items-center bg-white rounded-lg relative">
        <img
          src={pokemon?.sprites.other["official-artwork"].front_default}
          alt={pokemon.name}
          className="w-[40%]"
        />
        <div className="flex w-full justify-end pr-2 absolute bottom-2">
          {types.map((type) => (
            <Types
              key={type.name}
              name={type.name}
              types={typeColors[type.name].img}
            />
          ))}
        </div>
      </div>

      <div
        className="flex justify-between items-center h-10"
        style={{
          borderTop: `${typeColors[types[0].name].background} 1px solid`,
        }}>
        <h3
          className="text-xl font-bold pl-2"
          style={{
            color: typeColors[types[0].name].background,
          }}>
          Abilities
        </h3>
        <div className="flex gap-2 pr-2">
          {pokemon.abilities.map((ability, index) => (
            <span
              className=" w-[100px] rounded-md flex justify-center items-center font-semibold"
              key={index}
              style={{ background: typeColors[types[0].name].background }}>
              {ability.ability.name}
            </span>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-md flex justify-center flex-col items-center">
        <h2 className="text-2xl font-bold">Stats</h2>
        {pokemon.stats.map((stat, index) => (
          <div
            key={index}
            className="flex justify-center  gap-1 flex-col w-[90%]">
            <div className="flex justify-between items-center">
              <h3 className="font-bold ">{stat.stat.name}</h3>
              <h4>{stat.base_stat}/255</h4>
            </div>
            <div className="h-4 border rounded-md">
              <div
                style={{ width: getPercentStatBar(stat.base_stat) }}
                className="h-full bg-gradient-to-r from-yellow-300 to-yellow-500 flex "></div>
            </div>
          </div>
        ))}
        <div
          className="flex w-full mt-4 h-[auto] justify-end items-center gap-2 pr-2 "
          style={{ background: typeColors[types[0].name].background }}>
          <div className="flex  justify-center items-center">
            <h5 className="font-bold text-md">Weight:</h5>
            <span className="font-bold text-lg">{pokemon?.weight}</span>
          </div>
          {"/"}
          <div className="flex justify-center items-center">
            <h5 className="font-bold text-md">Height:</h5>
            <span className="font-bold text-lg">{pokemon?.height}</span>
          </div>
        </div>
      </div>
    </article>
  );
}

export default DetailsCard;
