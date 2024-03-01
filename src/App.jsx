import "./App.css";
import Search from "./Components/Search";
import Layout from "./Components/Layout";
import PokemonSection from "./Components/PokemonSection";
import useInfiniteScroll from "./hooks/useInfiniteScroll";
import { Spinner } from "flowbite-react";
import SelectTypes from "./Components/SelectTypes";
import usePokemonData from "./hooks/usePokemonData";

function App() {
  const { pokemons, loading, totalPokemon, dispatch, limit, offset } =
    usePokemonData();

  useInfiniteScroll(pokemons, totalPokemon, dispatch, limit, offset);
  return (
    <>
      <Layout>
        <h1 className="text-4xl text-blue-400 mt-10">pokedex</h1>
        <div className="w-[90%] flex justify-around items-center">
          <Search />
          <SelectTypes />
        </div>
        {loading ? (
          <div className="w-full mt-[200px] flex justify-center items-center">
            <Spinner size="xl" />
          </div>
        ) : (
          <PokemonSection pokemons={pokemons} />
        )}
      </Layout>
    </>
  );
}

export default App;
