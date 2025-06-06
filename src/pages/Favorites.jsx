import React, { useEffect, useState } from "react";
import {
  getFavorites,
  removeFavoriteList,
  removeFromFavorites,
} from "../utils/favorite";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ArrowLeftCircleIcon, TrashIcon } from "@heroicons/react/24/solid";
import { BackspaceIcon } from "@heroicons/react/20/solid";
// import MovieCard from '../Components/MovieCard';

const Favorites = () => {
  const [favorite, setFavorite] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setFavorite(getFavorites());
  }, []);

  const handleRemove = (id) => {
    removeFromFavorites(id);
    setFavorite(getFavorites());
    toast.success(`${movie.Title} removed from Favorites`);
  };

  const removeList = () => {
    removeFavoriteList();
    setFavorite([]);
    toast.info("Favorite List cleared");
  };
  return (
    <div className="min-h-screen text-white px-4 py-6 bg-gray-900 ">
      <h1 className="text-2xl font-bold mb-4">Favorite Movies</h1>
      <div className="flex justify-between items-center">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 transition cursor-pointer"
        >
          <ArrowLeftCircleIcon className="w-7 h-7 text-white hover:text-gray-500" />
          <span>Back</span>
        </button>

        <button onClick={removeList} className="cursor-pointer">
          <TrashIcon className="w-7 h-7 text-white hover:text-red-400" />
          clear all
        </button>
      </div>

      {favorite.length === 0 ? (
        <p className="text-center text-gray-400 mt-10">
          No favorites found. Go add some movies!
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {favorite.map((movie) => (
            <div
              className="rounded-lg shadow hover:scale-105 transition-transform"
              key={movie.imdbID}
            >
              <Link key={movie.imdbID} to={`/movie/${movie.imdbID}`}>
                <img
                  src={movie.Poster != "N/A" ? movie.Poster : "no-poster.png"}
                  alt={movie.Title}
                  className="w-full h-60 object-cover rounded-t-lg shadow-lg"
                />
              </Link>
              <div className="px-3 pb-5 bg-gray-800 rounded-b-lg -mt-2">
                <h2 className="text-white mt-2 text-xl font-bold truncate pt-3">
                  {movie.Title}
                </h2>
                <p className="text-gray-400 text-sm font-semibold">
                  ({movie.Year})
                </p>
                <div className="lg:flex justify-between items-center mt-5 ">
                  <button className="bg-white text-gray-900 font-semibold rounded px-3 py-1 hover:bg-gray-500 transition-all duration-300 lg:h-10">
                    <Link to={`/movie/${movie.imdbID}`}>View Details</Link>
                  </button>

                  <button
                    onClick={() => handleRemove(movie.imdbID)}
                    className="bg-red-300 text-gray-900 font-semibold rounded px-2 md:px-3 md:py-1 hover:cursor-pointer hover:bg-red-500 transition-all duration-300 mt-5 lg:h-10 lg:-mt-1"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
