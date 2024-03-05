import React from "react";
import PokeCard from "./PokeCard";

function PokemonSection({ pokemonList }) {
  return (
    <section className=" w-[90%] grid mt-10 mx-auto lg:grid-cols-5 gap-4 md:grid-cols-3 sm:grid-cols-2">
      {pokemonList.map((pokemon, index) => (
        <PokeCard key={index} pokemon={pokemon} />
      ))}
    </section>
  );
}
PokemonSection.defaultProps = {
  pokemonList: Array(10).fill(""),
};
export default PokemonSection;
