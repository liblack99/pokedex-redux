import { useEffect } from "react";
import { getPokemonsWithDetails } from "../actions";

function useInfiniteScroll(pokemons, totalPokemon, dispatch, limit, offset) {
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
          document.documentElement.offsetHeight &&
        pokemons.length < totalPokemon
      ) {
        dispatch(getPokemonsWithDetails(limit, offset));
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pokemons]);
}

export default useInfiniteScroll;
