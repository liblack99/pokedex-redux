import React, {useState, useRef, useEffect} from "react";
import AddFavoriteBtn from "./AddFavoriteBtn";
import typeColors from "../colorTypes/colorTypes";
import {getPokemonTypes} from "../utils/utils";
import Types from "./Types";
import {useDispatch} from "react-redux";
import {setCurrentPokemon} from "../slices/pokemonSlice";

export default function PokeCard({pokemon}) {
  const types = getPokemonTypes(pokemon);
  const [isVisible, setIsVisible] = useState(false);
  const imageRef = useRef();
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setCurrentPokemon(pokemon.id));
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      });
    });

    observer.observe(imageRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <article
      className="flex rounded-lg  bg-white shadow-md flex-col max-w-sm object-contain relative zoomIn min-h-[290px] cursor-pointer "
      style={{border: `${typeColors[types[0].name].background} 1px solid`}}>
      <AddFavoriteBtn pokemon={pokemon} />
      <div
        className="flex h-full flex-col justify-center items-center  gap-4 p-6"
        onClick={handleClick}>
        <div className="min-w-[216px] min-h-[216px]">
          <img
            alt={pokemon.name}
            src={
              isVisible
                ? pokemon?.sprites.other["official-artwork"].front_default
                : ""
            }
            ref={imageRef}
            className="rounded-t-lg"
          />
        </div>

        <h3
          className="text-2xl text-center font-bold tracking-tight"
          style={{
            color: `${typeColors[types[0].name].background}`,
          }}>
          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
        </h3>
        <div className="flex gap-4 justify-center items-center">
          {types.map((type) => (
            <Types
              key={type.name}
              name={type.name}
              types={typeColors[type.name].img}
            />
          ))}
        </div>
      </div>
    </article>
  );
}
