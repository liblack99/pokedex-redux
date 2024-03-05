import "./App.css";
import Search from "./Components/Search";
import Layout from "./Components/Layout";
import PokemonSection from "./Components/PokemonSection";
import { Spinner } from "flowbite-react";
import SelectTypes from "./Components/SelectTypes";
import usePokemonData from "./hooks/usePokemonData";
import { useEffect } from "react";
import Modal from "./Components/Modal";
import DetailsCard from "./Components/DetailsCard";
import { fetchPokemons } from "./slices/pokemonSlice";

function App() {
  const {
    pokemonList,
    loading,
    limit,
    offset,
    totalPokemonCount,
    currentPokemon,
    isModalOpen,
    dispatch,
  } = usePokemonData();

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
          document.documentElement.offsetHeight &&
        pokemonList.length < totalPokemonCount &&
        pokemonList.length >= 20
      ) {
        dispatch(fetchPokemons({ limit, offset }));
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pokemonList]);
  return (
    <>
      <Layout>
        <h1 className="text-4xl text-blue-400 mt-10  mb-10">pokedex</h1>
        <div className="w-[90%] flex justify-around items-center flex-wrap">
          <Search />
          <SelectTypes />
        </div>
        {loading && (
          <div className="w-full mt-[200px] flex justify-center items-center">
            <Spinner size="xl" />
          </div>
        )}
        <PokemonSection pokemonList={pokemonList} />
        {isModalOpen && (
          <Modal>
            <DetailsCard pokemon={currentPokemon} />
          </Modal>
        )}
      </Layout>
    </>
  );
}

export default App;
