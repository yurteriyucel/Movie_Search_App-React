//favorite.js
//Get favorites array from localStorage or return empty array

export const getFavorites = () => {
  const stored = localStorage.getItem("favorites");
  try {
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
};

//Check if a movie is already in favorites
export const isInFavorite = (movie) => {
  const favorites = getFavorites();
  return (
    Array.isArray(favorites) &&
    favorites.some((fav) => fav.imdbID === movie.imdbID)
  );
};

//Add movie to favorites(if not already present)
export const addToFavorite = (movie) => {
  const favorites = getFavorites();
  if (!isInFavorite(movie)) {
    favorites.push(movie);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    return true;
  }
  return false;
};

//Remove movie from favorites by IMDb ID
export const removeFromFavorites = (id) => {
  const updated = getFavorites().filter((m) => m.imdbID !== id);
  localStorage.setItem("favorites", JSON.stringify(updated));
};

export const removeFavoriteList = () => {
  localStorage.removeItem("favorites");
};
