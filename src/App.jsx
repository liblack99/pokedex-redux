import "./App.css";
import Search from "./Components/Search";
import Layout from "./Components/Layout";
import PokemonSection from "./Components/PokemonSection";
import { Spinner } from "flowbite-react";
import SelectTypes from "./Components/SelectTypes";
import usePokemonData from "./hooks/usePokemonData";
import { useEffect } from "react";
import { getPokemonsWithDetails } from "./actions";
import Modal from "./Components/Modal";
import DetailsCard from "./Components/DetailsCard";

function App() {
  const {
    pokemons,
    loading,
    totalPokemon,
    dispatch,
    limit,
    offset,
    currentPokemon,
    open,
  } = usePokemonData();
 

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
          document.documentElement.offsetHeight &&
        pokemons.length < totalPokemon &&
        pokemons.length >= 10
      ) {
        dispatch(getPokemonsWithDetails(limit, offset));
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pokemons]);
  return (
    <>
      <Layout>
        <h1 className="text-4xl text-blue-400 mt-10">pokedex</h1>
        <div className="w-[90%] flex justify-around items-center">
          <Search />
          <SelectTypes />
        </div>
        {loading && (
          <div className="w-full mt-[200px] flex justify-center items-center">
            <Spinner size="xl" />
          </div>
        )}
        {<PokemonSection pokemons={pokemons} />}
        {open && (
          <Modal>
            <DetailsCard pokemon={currentPokemon} />
          </Modal>
        )}
      </Layout>
    </>
  );
}

export default App;
