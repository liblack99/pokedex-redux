import { useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { getPokemonWithType, getPokemonsWithDetails } from "../actions";

function usePokemonData() {
  const pokemons = useSelector((state) => state.pokemons, shallowEqual);
  const loading = useSelector((state) => state.loading, shallowEqual);
  const limit = useSelector((state) => state.limit, shallowEqual);
  const offset = useSelector((state) => state.offset, shallowEqual);
  const totalPokemon = useSelector((state) => state.totalPokemon, shallowEqual);
  const open = useSelector((state) => state.open, shallowEqual);
  const currentPokemon = useSelector(
    (state) => state.currentPokemon,
    shallowEqual
  );

  const dispatch = useDispatch();
  useEffect(() => {
    if (pokemons.length === 0) {
      dispatch(getPokemonsWithDetails(limit, offset));
      dispatch(getPokemonWithType());
    }
  }, []);

  return {
    pokemons,
    loading,
    limit,
    offset,
    totalPokemon,
    currentPokemon,
    open,
    dispatch,
  };
}

export default usePokemonData;
