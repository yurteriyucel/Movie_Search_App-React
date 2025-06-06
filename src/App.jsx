import React, { useEffect, useRef, useState } from "react";
import Navbar from "./Components/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Favorites from "./pages/Favorites";
import SearchResults from "./pages/SearchResults";
import Categories from "./pages/Categories";
import MovieDetails from "./pages/MovieDetails";
import SearchBar from "./Components/SearchBar";

const App = () => {
  const [showSearch, setShowSearch] = useState(false);
  const location = useLocation();

  // closes search input when route changes
  useEffect(() => {
    setShowSearch(false);
  }, [location]);

  const toggleSearch = () => {
    setShowSearch((prev) => !prev);
  };

  const iconRef = useRef();
  return (
    <div className="relative">
      {/* Navbar always visibe */}
      <Navbar onSearchClick={toggleSearch} iconRef={iconRef} />

      {/* Blur background & Search bar globally rendered */}
      {showSearch && (
        <>
          <div className="fixed inset-0 backdrop-blur-sm z-10"></div>
          <SearchBar
            onClose={() => setShowSearch(false)}
            show={showSearch}
            iconRef={iconRef}
          />
        </>
      )}

      {/* page routes */}
      <div className="relative z-0 ">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/category/:type" element={<Categories />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/search/:keyword" element={<SearchResults />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
