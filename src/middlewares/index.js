export const logger = (store) => (next) => (action) => {
  console.log(action);
  next(action);
};

export const featuring = (store) => (next) => (action) => {
  const featured = [{ name: "eddie" }, ...action.action.payload];
  const updatedActionInfo = {
    ...action,
    action: { ...action.action, payload: featured },
  };
  next(updatedActionInfo);
};

export const prefix = (store) => (next) => (action) => {
  const prefixed = action.action.payload.map((pokemon) => ({
    ...pokemon,
    name: "Poke: " + pokemon.name,
  }));

  const updatedAction = {
    ...action,
    action: { ...action.action, payload: prefixed },
  };
  next(updatedAction);
};
