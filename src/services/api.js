import axios from "axios";

//API details
const API_KEY = "65c65de5"; //secrete key to get movies from api

const BASE_URL = "https://www.omdbapi.com/"; //actual url

// Reusable function to search movie by keyword, type & pagination
export const searchMovies = async (keyword, type, page = 1) => {
  try {
    return await axios.get(
      `${BASE_URL}?apikey=${API_KEY}&s=${keyword}&type=${type}&page=${page}`
    );
  } catch (error) {
    console.error("Error searching movies:", error);
    throw error;
  }
};

//function to search movies by keyword (from search bar)
export const searchMoviesResults = async (keyword, page = 1) => {
  try {
    return await axios.get(
      `${BASE_URL}?apikey=${API_KEY}&s=${keyword}&page=${page}`
    );
  } catch (error) {
    console.error("Error searching movies:", error);
    throw error;
  }
};

//Function to get movie by IMDb ID
export const getMoviesById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}?apikey=${API_KEY}&i=${id}`);
    return response.data;
  } catch (error) {
    console.log("Error fetching movie by ID:", error);
    return { Response: "False", Error: "Failed to fetch movie." };
  }
};

//Fecth by type, keyword, and page
export const fetchMoviesByType = async (keyword, type, page = 1) => {
  try {
    return await axios.get(
      `${BASE_URL}?apikey=${API_KEY}&s=${keyword}&type=${type}&page=${page}`
    );
  } catch (error) {
    console.error("Error fetching movies by type:", error);
    throw error;
  }
};
