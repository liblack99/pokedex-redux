import { useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {
  fetchPokemons,
  fetchPokemonWithType,
  fetchPokemonName,
} from "../slices/pokemonSlice";

function usePokemonData() {
  const pokemonList = useSelector((state) => state.pokemonList, shallowEqual);
  const loading = useSelector((state) => state.loading, shallowEqual);
  const limit = useSelector((state) => state.limit, shallowEqual);
  const offset = useSelector((state) => state.offset, shallowEqual);
  const query = useSelector((state) => state.searchQuery, shallowEqual);
  const totalPokemonCount = useSelector(
    (state) => state.totalPokemonCount,
    shallowEqual
  );
  const isModalOpen = useSelector((state) => state.isModalOpen, shallowEqual);

  const currentPokemon = useSelector(
    (state) => state.currentPokemon,
    shallowEqual
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (pokemonList.length === 0) {
      dispatch(fetchPokemons({ limit, offset }));
      dispatch(fetchPokemonWithType());
    }
  }, []);
  useEffect(() => {
    if (pokemonList.length > 24) {
      dispatch(fetchPokemonName({ totalPokemonCount, offset }));
    }
  }, [pokemonList.length > 24]);

  return {
    pokemonList,
    loading,
    limit,
    offset,
    totalPokemonCount,
    currentPokemon,
    isModalOpen,
    dispatch,
  };
}

export default usePokemonData;
