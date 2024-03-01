import React from "react";
import PokeCard from "./PokeCard";

function PokemonSection({ pokemons }) {
  return (
    <section className=" w-[90%] grid mt-10 mx-auto lg:grid-cols-5 gap-4 md:grid-cols-3 sm:grid-cols-2">
      {pokemons.map((pokemon, index) => (
        <PokeCard key={index} pokemon={pokemon} />
      ))}
    </section>
  );
}
PokemonSection.defaultProps = {
  pokemons: Array(10).fill(""),
};
export default PokemonSection;
