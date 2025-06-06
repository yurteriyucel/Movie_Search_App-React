import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMoviesById } from "../services/api";
import { ArrowLeftCircleIcon, HeartIcon, StarIcon } from "@heroicons/react/24/solid";
import {
  addToFavorite,
  getFavorites,
  removeFromFavorites,
} from "../utils/favorite";
import { toast } from "react-toastify";

const MovieDetails = () => {
  const { id } = useParams();

  const [movie, setMovie] = useState(null); //store one movie object data

  const [loading, setLoading] = useState(true); //show loader

  const [favoriteIds, setFavoriteIds] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchMovieDetails();
    const storedFavorites = getFavorites(); //from localStorage
    const ids =
      Array.isArray(storedFavorites) && storedFavorites.map((m) => m.imdbID);
    setFavoriteIds(ids);
  }, [id]);

  const fetchMovieDetails = async () => {
    setLoading(true);
    try {
      const data = await getMoviesById(id);
      if (data.Response === "True") {
        setMovie(data);
      } else {
        setMovie(null);
      }
    } catch (error) {
      console.log("Error fetching movie details:", error);
      toast.error("Failed to load movie details.");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFavorite = (movie) => {
    if (favoriteIds.includes(movie.imdbID)) {
      removeFromFavorites(movie.imdbID);
      setFavoriteIds((prev) => prev.filter((id) => id !== movie.imdbID));
      toast.success("Removed from Favorites");
    } else {
      addToFavorite(movie);
      setFavoriteIds((prev) => [...prev, movie.imdbID]);
      toast.success("Added to Favorites");
    }
  };

  if (loading)
    return (
      <p className="text-white text-xl px-5 pt-1 pb-2 bg-amber-400 absolute top-3/5 left-1/3 md:left-2/5 lg:left-[45%] -translatex-1/2 rounded max-w-full">
        Loading...
      </p>
    );
  if (!movie)
    return (
      <p className=" text-xl absolute mt-5 text-gray-800 top-1/2 left-1/2 -translate-x-1/2 font-semibold">
        No movies found
      </p>
    );
  const isfavorite = favoriteIds.includes(movie.imdbID);
  return (
    <div className="max-w-4xl mx-auto p-6 mt-5 bg-white shadow-lg rounded-lg md:mt-14">
      <button
        onClick={() => navigate(-1)}
        className="px-4 py-2 transition cursor-pointer"
      >
        <ArrowLeftCircleIcon className="w-7 h-7 text-gray-900 hover:text-blue-400 " />
        <span className="text-gray-950 font-semibold">Back</span>
      </button>
      <div className="flex flex-col md:flex-row items-center gap-6">
        <img
          src={
            movie.Poster !== "N/A"
              ? movie.Poster
              : "https://via.placeholder.com/300x450"
          }
          alt={movie.Title || "Movie Poster"}
          className="w-60 h-auto rounded shadow"
        />
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold mb-2">{movie.Title}</h1>
          <button onClick={() => handleToggleFavorite(movie)}>
            <HeartIcon
              className={`w-6 h-6 ${
                isfavorite ? "text-red-500" : "text-gray-300"
              } hover:scale-110 transition`}
            />
          </button>
          <p className="text-gray-600 mb-1 text-[18px]">
            Year: <span className="font-semibold ">{movie.Year}</span>
          </p>
          <p className="text-gray-600 mb-1 text-[18px]">
            Genre:{" "}
            <span className="font-semibold text-[17px]">{movie.Genre}</span>
          </p>
          <p className="text-gray-600 mb-1 text-[18px]">
            Director:{" "}
            <span className="font-semibold text-[17px]">{movie.Director}</span>
          </p>
          <p className="text-gray-600 mb-1 text-[18px]">
            Actors:{" "}
            <span className="font-semibold text-[17px]">{movie.Actors}</span>
          </p>
          <p className="text-gray-600 mb-1 text-[18px]">
            Plot:{" "}
            <span className="font-semibold text-[17px]" details={movie.Plot}>
              {movie.Plot}
            </span>
          </p>
          <p className="text-gray-600 mb-1 text-[18px]">
            IMDB Rating:{" "}
            <span className="font-semibold text-[17px]">
              {movie.imdbRating}<StarIcon className="w-5 h-5 inline-block -translate-y-0.5 text-amber-400"/>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
