import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { favorite } from "../icons/favorite";
import { Nofavorite } from "../icons/noFavorite";
import { setFavorites, removeFavorites } from "../actions";

function AddFavoriteBtn({ pokemon }) {
  const favorites = useSelector((state) => state.favorites);
  const isFavorite = favorites.some((fav) => fav.id === pokemon.id);
  const dispatch = useDispatch();
  const HandleAddFavorites = () => {
    if (!isFavorite) {
      dispatch(setFavorites(pokemon));
    }
  };

  const handleRemoveFavorites = () => {
    dispatch(removeFavorites(pokemon.id));
  };
  return (
    <div>
      {isFavorite ? (
        <button
          className="absolute right-1 top-1"
          onClick={handleRemoveFavorites}>
          {favorite}
        </button>
      ) : (
        <button className="absolute right-1 top-1" onClick={HandleAddFavorites}>
          {Nofavorite}
        </button>
      )}
    </div>
  );
}

export default AddFavoriteBtn;
