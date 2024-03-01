import { useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { getPokemonsWithDetails } from "../actions";

function usePokemonData() {
  const pokemons = useSelector((state) => state.pokemons, shallowEqual);
  const loading = useSelector((state) => state.loading, shallowEqual);
  const limit = useSelector((state) => state.limit, shallowEqual);
  const offset = useSelector((state) => state.offset, shallowEqual);
  const totalPokemon = useSelector((state) => state.totalPokemon, shallowEqual);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPokemonsWithDetails(limit, offset));
  }, []);

  return { pokemons, loading, limit, offset, totalPokemon, dispatch };
}

export default usePokemonData;
