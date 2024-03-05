import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { fetchPokemonName, setSearchQuery } from "../slices/pokemonSlice";

function Search() {
  const totalPokemon = useSelector(
    (state) => (state.totalPokemonCount, shallowEqual)
  );
  const offset = useSelector((state) => (state.offset, shallowEqual));
  const dispatch = useDispatch();

  const handelChange = (event) => {
    const query = event.target.value.trim().toLowerCase();
    dispatch(setSearchQuery(query));
  };

  return (
    <form className="w-[300px] mt-4">
      <label className="sr-only">Search</label>
      <div className="relative w-full">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"></div>
        <input
          type="text"
          id="simple-search"
          className="bg-gray-50 border border-blue-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Buscar Pokemon"
          required
          onChange={handelChange}
        />
      </div>
    </form>
  );
}

export default Search;
