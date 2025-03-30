import {createSlice, createAsyncThunk, current} from "@reduxjs/toolkit";
import {getPokemonDetails, getPokemon, getTypes} from "../services";

const initialState = {
  pokemonList: [],
  filteredPokemonList: [],
  loading: false,
  searchList: [],
  offset: 0,
  limit: 25,
  typesList: [],
  pokemonFavorites: [],
  currentPokemon: null,
};

export const fetchPokemons = createAsyncThunk(
  "pokemon/fetchPokemons",
  async ({limit, offset}, thunkAPI) => {
    try {
      const response = await getPokemon(limit, offset);
      const pokemons = response.results;
      const pokemonsDetailed = await Promise.all(
        pokemons.map((pokemon) => getPokemonDetails(pokemon))
      );
      return pokemonsDetailed;
    } catch (error) {
      return thunkAPI.rejectWithValue({error: error.message});
    }
  }
);

export const fetchPokemonWithType = createAsyncThunk(
  "pokemon/fetchPokemonWithType",
  async (_, thunkAPI) => {
    try {
      const types = await getTypes();
      return types;
    } catch (error) {
      return thunkAPI.rejectWithValue({error: error.message});
    }
  }
);

export const fetchTotalPokemon = createAsyncThunk(
  "pokemon/fetchtotalPockemon",
  async (_, thunkAPI) => {
    try {
      const response = await getPokemon(151, 0);
      const pokemons = response.results;
      const pokemonsDetailed = await Promise.all(
        pokemons.map((pokemon) => getPokemonDetails(pokemon))
      );
      return pokemonsDetailed;
    } catch (error) {
      return thunkAPI.rejectWithValue({error: error.message});
    }
  }
);

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    setFilterPokemonName: (state, action) => {
      const pokemonName = action.payload.toLowerCase();
      if (pokemonName !== "") {
        state.pokemonList = state.filteredPokemonList.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(pokemonName)
        );
      } else {
        state.pokemonList = state.filteredPokemonList;
      }
    },
    setFilterPokemonType: (state, action) => {
      const selectedType = action.payload;

      if (selectedType === "FAVORITES") {
        state.pokemonList = state.pokemonFavorites;
      } else if (selectedType !== "ALL") {
        state.pokemonList = state.filteredPokemonList.filter((pokemon) =>
          pokemon.types?.some((type) => type.type.name === selectedType)
        );
      } else {
        state.pokemonList = state.filteredPokemonList;
      }
    },
    addFavoritePokemons: (state, action) => {
      const pokemon = action.payload;
      if (!state.pokemonFavorites.some((fav) => fav.id === pokemon.id)) {
        state.pokemonFavorites.push(pokemon);
      }
    },
    removeFavoritePokemons: (state, action) => {
      const pokemonId = action.payload;
      state.pokemonFavorites = state.pokemonFavorites.filter(
        (pokemon) => pokemon.id !== pokemonId
      );
    },
    setCurrentPokemon: (state, action) => {
      const pokemonId = action.payload;
      const currentPokemon = state.pokemonList.find(
        (pokemon) => pokemon.id === pokemonId
      );
      state.currentPokemon = currentPokemon;
    },
    removeCurrentPokemon: (state) => {
      state.currentPokemon = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemons.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPokemons.fulfilled, (state, action) => {
        state.pokemonList = [...state.pokemonList, ...action.payload];
        state.originalPokemonList = state.pokemonList;
        state.offset += state.limit;
        state.loading = false;
      })
      .addCase(fetchPokemons.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchPokemonWithType.fulfilled, (state, action) => {
        state.typesList = action.payload;
      })
      .addCase(fetchPokemonWithType.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchTotalPokemon.fulfilled, (state, action) => {
        state.filteredPokemonList = action.payload;
      })
      .addCase(fetchTotalPokemon.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default pokemonSlice.reducer;

export const {
  setFilterPokemonName,
  setFilterPokemonType,
  removeFavoritePokemons,
  addFavoritePokemons,
  setCurrentPokemon,
  removeCurrentPokemon,
} = pokemonSlice.actions;
