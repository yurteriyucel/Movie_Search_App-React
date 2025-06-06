import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchMoviesResults } from "../services/api";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

const SearchBar = ({ onClose, show, iconRef }) => {
  const [keyword, setKeyword] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  const searchRef = useRef();

  //Close on outside click or route change
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target) &&
        iconRef.current &&
        !iconRef.current.contains(event.target)
      ) {
        //the actual div element of the search box
        onClose(); //closes when clicking outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  //Handle input change
  const handleInputChange = async (e) => {
    const value = e.target.value;
    setKeyword(value);
    if (value.length > 2) {
      try {
        const res = await searchMoviesResults(value, 1);
        if (Array.isArray(res.data.Search)) {
          setSuggestions(res.data.Search.slice(0, 10));
        } else {
          setSuggestions([
            { Title: "No results found", imdbID: "no", Type: "" },
          ]); //
        }
      } catch (error) {
        console.log("Suggestion fetch failed:", error);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  //handle Selecting a suggestion
  const handleSelect = (title) => {
    if (title === "No results found") return;
    navigate(`/search/${title}`);
    setKeyword("");
    onClose();
  };

  //Manual  search
  const handleSearch = () => {
    if (keyword.trim()) {
      navigate(`/search/${keyword.trim()}`);
      setKeyword("");
      onClose();
    }
  };

  //Handle enter key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleClear = () => {
    setKeyword("");
    setSuggestions([]);
  };

  return (
    <>
      <div
        ref={searchRef}
        className={`absolute left-4 w-74 p-4 z-50 rounded-lg bg-gray-900 text-black shadow-md transition-all duration-300 ease-in-out md:mt-[49px] md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[70%] md:px-7 md:py-7  ${
          show
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <div className="flex justify-between items-center relative">
          <button
            onClick={handleSearch}
            className="cursor-pointer absolute ml-2"
          >
            <MagnifyingGlassIcon className="w-5 h-5 cursor-pointer text-[#858282]" />
          </button>
          <input
            type="text"
            placeholder="Search"
            value={keyword}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="w-full pl-9 pr-4 py-2 text-white font-semibold placeholder:text-[#9c9a9a] placeholder:font-semibold placeholder:text-xl md:text-xl rounded outline-none border-none bg-gray-800 focus:outline-none focus:ring-2 focus:ring-white caret-white"
            autoFocus
          />
          <button
            onClick={handleClear}
            disabled={!keyword}
            className="cursor-pointer absolute ml-2 right-2 text-white font-semibold text-xl hover:rounded-md hover:text-gray-700 hover:bg-white px-2 py-1 hover:font-semibold"
          >
            Clear
          </button>
        </div>
        {suggestions.length > 0 && (
          <ul className="absolute top-full left-0 right-0 bg-gray-900 rounded-b-xl shadow max-h-72 overflow-y-auto z-30 text-white font-semibold -mt-1 md:px-7 md:pb-10 sidebar">
            {suggestions.map((item) => (
              <li
                key={item.imdbID}
                className={`p-2 cursor-pointer hover:bg-white hover:text-gray-900 flex justify-between ${
                  item.imdbID === "no" ? "text-white cursor-default" : ""
                }`}
                onClick={() => handleSelect(item.Title)}
              >
                <span>{item.Title}</span>
                <span className="text-xs text-white">
                  {item.Type && `(${item.Type})`}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default SearchBar;
