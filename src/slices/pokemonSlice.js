import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPokemonDetails, getPokemon, getTypes } from "../services";

const initialState = {
  pokemonList: [],
  loading: true,
  favoritePokemons: [],
  searchList: [],
  searchQuery: "",
  originalPokemonList: [],
  typesList: [],
  offset: 0,
  limit: 25,
  totalPokemonCount: 151,
  filterType: "ALL",
  currentPokemon: {},
  isModalOpen: false,
};

export const fetchPokemons = createAsyncThunk(
  "pokemon/fetchPokemons",
  async ({ limit, offset }, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true));
    try {
      const response = await getPokemon(limit, offset);
      const pokemons = response.results;
      const pokemonsDetailed = await Promise.all(
        pokemons.map((pokemon) => {
          return getPokemonDetails(pokemon);
        })
      );
      thunkAPI.dispatch(setPokemonList(pokemonsDetailed));
      thunkAPI.dispatch(setLoading(false));
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const fetchPokemonName = createAsyncThunk(
  "pokemon/fetchPokemons",
  async ({ totalPokemonCount, offset }, thunkAPI) => {
    try {
      const response = await getPokemon(totalPokemonCount, offset);
      const pokemons = response.results;
      const pokemonsName = await Promise.all(
        pokemons.map((pokemon) => {
          return getPokemonDetails(pokemon);
        })
      );
      thunkAPI.dispatch(setSearchList(pokemonsName));
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const fetchPokemonWithType = createAsyncThunk(
  "pokemon/fetchPokemonWithType",
  async (_, thunkAPI) => {
    try {
      const types = await getTypes();
      thunkAPI.dispatch(setTypesList(types));
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setPokemonList: (state, action) => {
      state.pokemonList = [...state.pokemonList, ...action.payload];
      state.originalPokemonList = state.pokemonList;
      state.offset = state.offset + state.limit;
    },
    setFavoritePokemons: (state, action) => {
      state.favoritePokemons.push(action.payload);
    },
    removeFavoritePokemons: (state, action) => {
      state.favoritePokemons = state.favoritePokemons.filter(
        (pokemon) => pokemon.id !== action.payload
      );
    },
    setSearchQuery: (state, action) => {
      const value = action.payload;
      const filterName = state.searchList.filter((pokemon) =>
        pokemon.name.includes(value)
      );
      if (value === "") {
        state.searchQuery = value;
        state.pokemonList = state.originalPokemonList;
      } else {
        state.pokemonList = filterName;
      }
    },
    setSearchList: (state, action) => {
      state.searchList = action.payload;
    },
    setTypesList: (state, action) => {
      state.typesList = action.payload;
    },

    setFilterType: (state, action) => {
      const value = action.payload.trim().toLowerCase();
      const { originalPokemonList, favoritePokemons, searchList } = state;
      if (value === "all") {
        state.filterType = value;
        state.pokemonList = originalPokemonList;
      } else if (value === "favorites") {
        state.filterType = value;
        state.pokemonList = favoritePokemons;
      } else {
        const filteredPokemonsTypes = searchList.filter((pokemon) =>
          pokemon.types.some((type) => type.type.name === value)
        );
        state.filterType = value;
        state.pokemonList = filteredPokemonsTypes;
      }
    },
    setCurrentPokemon: (state, action) => {
      state.currentPokemon = action.payload;
    },
    setIsModalOpen: (state, action) => {
      state.isModalOpen = action.payload;
    },
  },
});

export const {
  setLoading,
  setPokemonList,
  setFavoritePokemons,
  removeFavoritePokemons,
  setSearchQuery,
  setTypesList,
  setFilterType,
  setCurrentPokemon,
  setIsModalOpen,
  setSearchList,
} = pokemonSlice.actions;
export default pokemonSlice.reducer;
