import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getMoviesById, searchMoviesResults } from "../services/api";
import {
  addToFavorite,
  getFavorites,
  removeFromFavorites,
} from "../utils/favorite";
import { HeartIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";
import Pagination from "../Components/Pagination";
import { ArrowLeftCircleIcon } from "@heroicons/react/16/solid";

const SearchResults = () => {
  const { keyword } = useParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  // const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData(keyword, currentPage);
    const storedFavorites = getFavorites(); //from localStorage
    const ids =
      Array.isArray(storedFavorites) && storedFavorites.map((m) => m.imdbID);
    setFavoriteIds(ids);
  }, [keyword, currentPage]);

  const fetchData = async (word, page) => {
    try {
      setLoading(true);
      const response = await searchMoviesResults(word, page);

      if (response.data && Array.isArray(response.data.Search)) {
        const allMovies = response.data.Search;
        // setTotalResults(response.length * 10);   //rough fallback
        // const totalResults = parseInt(response.data.totalResults);
        setResults(allMovies);
        setTotalResults(parseInt(response.data.totalResults || 0));
        // setTotalPages(Math.ceil(totalResults/10));

        // first try title match
        const titleMatch = allMovies.filter(
          (movie) =>
            movie.Title &&
            movie.Title.toLowerCase().includes(keyword.toLowerCase())
        );

        if (titleMatch.length > 0) {
          setResults(titleMatch);
          setError(null);
        } else {
          //If no title match try genre match by fetching full details
          const genreFiltered = await Promise.all(
            allMovies.map(async (movie) => {
              const details = await getMoviesById(movie.imdbID);
              return details;
            })
          );

          const matchedByGenre = genreFiltered.filter(
            (movie) =>
              movie.Genre &&
              movie.Genre.toLowerCase().includes(keyword.toLowerCase())
          );

          if (matchedByGenre.length > 0) {
            setResults(matchedByGenre);
            setError(null);
          } else {
            setResults([]);
            setError("No results found");
          }
        }
      } else {
        setResults([]);
        setError("No results found");
      }
    } catch (error) {
      setError("Something went wrong");
      setResults([]);
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

  const totalPages = Math.ceil(totalResults / 10); //OMDB returns 10 per page
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  return (
    <div className="px-5 bg-gray-900 ">
      {loading ? (
        <p className="text-white text-xl px-5 pt-1 pb-2 bg-amber-400 absolute top-3/5 left-1/3 md:left-2/5 lg:left-[45%] -translatex-1/2 rounded max-w-full">
          Loading...
        </p>
      ) : error ? (
        <p className=" text-xl absolute mt-5 text-gray-800 top-1/2 left-1/2 -translate-x-1/2 font-semibold">
          No movies found
        </p>
      ) : (
        // Results grid
        <div>
          <h2 className="text-2xl font-bold mb-4 text-white">
            Search Results for:{keyword}
          </h2>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 transition cursor-pointer"
          >
            <ArrowLeftCircleIcon className="w-7 h-7 text-white hover:text-gray-500" />
            <span className="text-white">Back</span>
          </button>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {results.map((movie) => {
              const isfavorite = favoriteIds.includes(movie.imdbID);
              return (
                <div
                  key={movie.imdbID}
                  className="rounded-lg shadow hover:scale-105 transition-transform"
                >
                  <Link to={`/movie/${movie.imdbID}`}>
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
                          className={` w-7 h-7 ${
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

export default SearchResults;
