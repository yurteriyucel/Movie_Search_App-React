import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchMoviesByType } from "../services/api";
import {
  addToFavorite,
  getFavorites,
  removeFromFavorites,
} from "../utils/favorite";
import { HeartIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";
import Pagination from "../Components/Pagination";

const Categories = () => {
  const { type } = useParams();
  // Get the type from url

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  //Load favorites on first render
  useEffect(() => {
    const storedFavorites = getFavorites(); //from localStorage
    const ids = Array.isArray(storedFavorites)
      ? storedFavorites.map((m) => m.imdbID)
      : [];
    setFavoriteIds(ids);
  }, []);

  //Fetch movies on type or page change

  useEffect(() => {
    fetchMovies(currentPage);
  }, [type, currentPage]);

  const fetchMovies = async (page) => {
    try {
      setLoading(true);
      const keywords =
        type === "episode"
          ? ["friends", "office", "breaking", "stranger", "lost"]
          : [
              "war",
              "star",
              "life",
              "dark",
              "man",
              "day",
              "girl",
              "spiderman",
              "batman",
            ];
      const randomWord = keywords[Math.floor(Math.random() * keywords.length)];
      const response = await fetchMoviesByType(randomWord, type, page);
      // const response = await fetchMoviesByType( type, page);
      if (response.data.Response === "True") {
        setMovies(response.data.Search);
        const totalResults = parseInt(response.data.totalResults);
        setTotalPages(Math.ceil(totalResults / 10));
      } else {
        setMovies([]);
        setTotalPages(1);
      }
    } catch (error) {
      console.log("error fetching data:", error);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  // const handleNext = () => {
  //   if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  // };

  // const handlePrev = () => {
  //   if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  // };

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

  // if (loading) {
  //   return (
  //     <div>
  //       <p>Loading...</p>
  //     </div>
  //   );
  // }

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  return (
    <div className=" bg-gray-900 px-5">
      {loading ? (
        <p className="text-white text-xl px-5 pt-1 pb-2 bg-amber-400 absolute top-3/5 left-1/3 md:left-2/5 lg:left-[45%] -translatex-1/2 rounded max-w-full">
          Loading...
        </p>
      ) : movies.length === 0 ? (
        <p className=" text-xl absolute mt-5 text-gray-800 top-1/2 left-1/2 -translate-x-1/2 font-semibold">
          No movies found
        </p>
      ) : (
        <div>
          <h2 className="text-2xl font-bold text-white mb-4 pt-5">
            Explore {type}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {movies.map((movie) => {
              const isfavorite = favoriteIds.includes(movie.imdbID);
              return (
                <div
                  key={movie.imdbID}
                  className="rounded-lg shadow hover:scale-105 transition-transform"
                >
                  <Link key={movie.imdbID} to={`/movie/${movie.imdbID}`}>
                    <img
                      src={
                        movie.Poster != "N/A" ? movie.Poster : "no-poster.png"
                      }
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

                    <div className="sm:flex sm:justify-between sm:items-center mt-5">
                      <button className="bg-white text-gray-900 font-semibold rounded px-2 hover:bg-gray-500 transition-all duration-300 sm:px-3 sm:py-1 lg:h-10">
                        <Link to={`/movie/${movie.imdbID}`}>View Details</Link>
                      </button>
                      <button
                        onClick={() => handleToggleFavorite(movie)}
                        className="h-5"
                      >
                        <HeartIcon
                          className={`w-7 h-7 ${
                            isfavorite ? "text-red-500" : "text-gray-400"
                          } hover:scale-110 transition`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {/* Pagination controls */}
          <div className="pb-5">
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                // onPrevious={handlePrev}
                // onNext = {handleNext}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
