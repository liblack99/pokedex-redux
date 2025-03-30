import {useEffect, useCallback, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {
  fetchPokemons,
  fetchTotalPokemon,
  fetchPokemonWithType,
} from "./slices/pokemonSlice"; // Ya no necesitamos `setOffset`
import Search from "./Components/Search";
import Layout from "./Components/Layout";
import PokemonSection from "./Components/PokemonSection";
import {Spinner} from "flowbite-react";
import SelectTypes from "./Components/SelectTypes";
import Modal from "./Components/Modal";
import DetailsCard from "./Components/DetailsCard";

function App() {
  const dispatch = useDispatch();
  const pokemonList = useSelector((state) => state.pokemonList);
  const loading = useSelector((state) => state.loading);
  const offset = useSelector((state) => state.offset);
  const limit = useSelector((state) => state.limit);
  const currentPokemon = useSelector((state) => state.currentPokemon);

  console.log("pokemonList", pokemonList);

  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    if (pokemonList.length === 0) {
      dispatch(fetchPokemons({limit, offset}));
    }
  }, [dispatch]);
  useEffect(() => {
    if (pokemonList.length === 0) {
      dispatch(fetchPokemonWithType());
    }
  }, [dispatch]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
      !loading &&
      pokemonList.length < 150 // Evitar cargar más si ya no hay pokemones
    ) {
      dispatch(fetchPokemons({limit, offset: pokemonList.length}));
    }
  }, [dispatch, loading, limit, pokemonList.length]);

  useEffect(() => {
    const onScroll = () => {
      clearTimeout(window.scrollTimeout);
      window.scrollTimeout = setTimeout(handleScroll, 200); // Debounce para evitar múltiples llamadas rápidas
    };
    if (filter !== "ALL") {
      return;
    }

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [handleScroll]);

  useEffect(() => {
    setTimeout(() => {
      dispatch(fetchTotalPokemon());
    }, 1000);
  }, []);

  return (
    <Layout>
      <h1 className="text-4xl text-blue-400 mt-10 mb-10">Pokedex</h1>
      <div className="w-[90%] flex justify-around items-center flex-wrap">
        <Search />
        <SelectTypes setFilter={setFilter} />
      </div>
      <PokemonSection pokemonList={pokemonList || []} />
      {loading && (
        <div className="w-full mt-[50px] flex justify-center items-center">
          <Spinner size="xl" />
        </div>
      )}

      {currentPokemon && (
        <Modal>
          <DetailsCard pokemon={currentPokemon} />
        </Modal>
      )}
    </Layout>
  );
}

export default App;
