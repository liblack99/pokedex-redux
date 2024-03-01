import {
  SET_LOADING,
  SET_POKEMONS,
  SET_FAVORITES,
  REMOVE_FAVORITES,
  SET_SEARCH,
  SET_TYPES,
  SET_FILTER,
} from "../actions/types";

const initialState = {
  pokemons: [],
  loading: true,
  favorites: [],
  search: "",
  originalPokemons: [],
  types: [],
  limit: 10,
  totalPokemon: 150,
  filterTypes: "all",
};

export const pokemonReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_POKEMONS:
      return {
        ...state,
        pokemons: [...state.pokemons, ...action.payload],
        originalPokemons: action.payload,
        offset: state.offset + state.limit,
      };
    case SET_LOADING:
      return { ...state, loading: action.payload };
    case SET_FAVORITES:
      return { ...state, favorites: [...state.favorites, action.payload] };
    case REMOVE_FAVORITES:
      return {
        ...state,
        favorites: state.favorites.filter(
          (pokemon) => pokemon.id !== action.payload
        ),
      };
    case SET_SEARCH: {
      const { originalPokemons } = state;
      const searchValue = action.payload.toLowerCase();

      const filteredPokemons = originalPokemons.filter((pokemon) =>
        pokemon.name.includes(searchValue)
      );

      return {
        ...state,
        search: searchValue,
        pokemons: filteredPokemons,
      };
    }
    case SET_TYPES:
      return {
        ...state,
        types: action.payload,
      };
    case SET_FILTER: {
      const { originalPokemons } = state;
      const value = action.payload.trim().toLowerCase();
      if (value === "all") {
        return {
          ...state,
          search: value,
          pokemons: originalPokemons,
        };
      }
      const filteredPokemonsTypes = originalPokemons.filter((pokemon) => {
        return pokemon.types.some((type) => type.type.name === value);
      });

      return {
        ...state,
        filterTypes: value,
        pokemons: filteredPokemonsTypes,
      };
    }
    default:
      return state;
  }
};
