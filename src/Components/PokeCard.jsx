import React, { useState, useRef, useEffect } from "react";
import AddFavoriteBtn from "./AddFavoriteBtn";
import typeColors from "../colorTypes/colorTypes";
import { getPokemonTypes } from "../utils/utils";

export default function PokeCard({ pokemon }) {
  const types = getPokemonTypes(pokemon);
  const [isVisible, setIsVisible] = useState(false);
  const imageRef = useRef();

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
    <article className="flex rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 flex-col max-w-sm object-contain relative">
      <AddFavoriteBtn pokemon={pokemon} />
      <div className="flex h-full flex-col justify-center  gap-4 p-6">
        <img
          alt={pokemon.name}
          src={
            isVisible
              ? pokemon?.sprites.other["official-artwork"].front_default
              : ""
          }
          ref={imageRef}
          className="rounded-t-lg"
          loading="lazy"
        />
        <h3 className="text-2xl text-center font-bold tracking-tight text-gray-900 dark:text-white">
          {pokemon.name}
        </h3>
        <div className="flex gap-4 justify-center items-center">
          {types.map((type) => (
            <span
              key={type.name}
              className="p-1 text-md rounded px-2 py-0.5 flex items-center"
              style={{
                backgroundColor: typeColors[type.name].background,
                color: typeColors[type.name].color,
              }}>
              {type.name}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
