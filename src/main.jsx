import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { pokemonReducer } from "./reducer/pokemons.js";
import { Provider } from "react-redux";
import { legacy_createStore, compose, applyMiddleware } from "redux";

import { thunk } from "redux-thunk";

const composeAlt = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const composedEnhancers = composeAlt(applyMiddleware(thunk));

const store = legacy_createStore(pokemonReducer, composedEnhancers);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
