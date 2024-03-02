export const getPokemonTypes = (pokemon = {}) => {
  return pokemon?.types.map((type) => type.type);
};
