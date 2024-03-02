import {
  SET_FAVORITES,
  SET_LOADING,
  SET_POKEMONS,
  REMOVE_FAVORITES,
  SET_SEARCH,
  SET_TYPES,
  SET_FILTER,
  SET_CURRENT_POKEMON,
  SET_OPEN,
} from "./types";
import { getPokemonDetails, getTypes } from "../services";
import { getPokemon } from "../services";

export const setPokemons = (payload) => ({
  type: SET_POKEMONS,
  payload,
});

export const getPokemonsWithDetails = (limit, offset) => async (dispatch) => {
  const response = await getPokemon(limit, offset);
  const pokemons = response.results;
  const pokemonsDetailed = await Promise.all(
    pokemons.map((pokemon) => {
      return getPokemonDetails(pokemon);
    })
  );

  dispatch(setPokemons(pokemonsDetailed));
  dispatch(setLoading(false));
};

export const getPokemonWithType = () => async (dispatch) => {
  const types = await getTypes();
  dispatch(setTypes(types));
};

export const setLoading = (payload) => ({
  type: SET_LOADING,
  payload,
});

export const setFavorites = (payload) => ({
  type: SET_FAVORITES,
  payload,
});

export const removeFavorites = (payload) => {
  return {
    type: REMOVE_FAVORITES,
    payload,
  };
};
export const setSearch = (payload) => {
  return {
    type: SET_SEARCH,
    payload,
  };
};
export const setTypes = (payload) => {
  return {
    type: SET_TYPES,
    payload,
  };
};
export const setFilter = (payload) => {
  return {
    type: SET_FILTER,
    payload,
  };
};
export const setCurrentPokemon = (payload) => {
  return {
    type: SET_CURRENT_POKEMON,
    payload,
  };
};
export const setOpen = (payload) => {
  return {
    type: SET_OPEN,
    payload,
  };
};
