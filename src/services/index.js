export const getPokemon = (limit, offset = 0) => {
  return fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error("Error en la solicitud");
    }
    return response.json();
  });
};
export const getPokemonDetails = (pokemon) => {
  return fetch(pokemon.url)
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const getTypes = () => {
  return fetch("https://pokeapi.co/api/v2/type")
    .then((res) => res.json())
    .then((data) => data.results)
    .catch((err) => console.log(err));
};
