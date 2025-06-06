import {
  HeartIcon,
  MagnifyingGlassIcon,
  Square2StackIcon,
} from "@heroicons/react/24/solid";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ onSearchClick, iconRef }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const categoryDropdownRef = useRef(null);
  const categoryIconRef = useRef(null);

  //toggle Dropdown on icon click
  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  //Closes dropdown on outside click (except the icon)
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        categoryDropdownRef.current &&
        !categoryDropdownRef.current.contains(event.target) &&
        categoryIconRef.current &&
        !categoryIconRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleCategoryClick);
    };
  }, []);

  const handleCategoryClick = (type) => {
    navigate(`/category/${type}`);
    setShowDropdown(false);
  };

  return (
    <>
      {/* Blur background when dropdown is visible */}
      {showDropdown && (
        <div className="fixed  inset-0 backdrop-blur-sm z-10"></div>
      )}
      {/* top Nav */}
      <nav className="bg-black text-white px-4 py-2 shadow-md sticky top-0 z-50 md:py-4">
        {/* Left  */}
        <div>
          <div className="flex justify-between items-center">
            <Link to={"/"} className="text-2xl text-red-600 font-extrabold">
              FlimHunt
            </Link>
            {/* Only visible in md and above */}
            <div className="hidden md:flex items-center gap-5 text-sm">
              <Link
                to={"/"}
                className="hover:text-gray-800 hover:bg-white font-semibold px-4 py-1 rounded-sm hover:underline active:bg-gray-600 active:text-white transition-all duration-300"
              >
                Home
              </Link>
              <Link
                to={"/movies"}
                className="hover:text-gray-800 hover:bg-white font-semibold px-4 py-1 rounded-sm hover:underline active:bg-gray-600 active:text-white transition-all duration-300"
              >
                Movies
              </Link>
              <Link
                to={"/favorites"}
                className="hover:text-gray-800 hover:bg-white font-semibold px-4 py-1 rounded-sm hover:underline active:bg-gray-600 active:text-white transition-all duration-300 flex"
              >
                Favorites
                <HeartIcon className="w-5 h-5 text-red-600" />
              </Link>
            </div>
            <div className="flex space-x-5">
              {/* right */}

              <div className=" flex items-center justify-center">
                <button
                  className="text-sm flex items-center gap-1 text-indigo-600 hover:text-indigo-800"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  ref={iconRef}
                >
                  <MagnifyingGlassIcon
                    className="w-10 h-10 text-white cursor-pointer  rounded-full p-2 hover:bg-white hover:text-gray-800"
                    onClick={onSearchClick}
                  />
                </button>
              </div>
              <div className="relative  flex items-center justify-center">
                <button onClick={toggleDropdown} ref={categoryIconRef}>
                  <Square2StackIcon className="w-10 h-10 text-white cursor-pointer  rounded-full p-2 hover:bg-white hover:text-gray-800" />
                </button>
              </div>
            </div>
          </div>
          {/* Bottom menu - like mobile tab bar */}
          <div className="w-full bg-black text-white flex gap-3 py-3 z-50 md:hidden">
            <Link
              to={"/"}
              className="hover:text-black hover:underline border rounded-4xl border-gray-400 text-sm px-3 py-1 ml-2 hover:bg-white"
            >
              Home
            </Link>
            <Link
              to={"/movies"}
              className="hover:text-black hover:underline border rounded-4xl border-gray-400 text-sm px-3 py-1 ml-2 hover:bg-white"
            >
              Movies
            </Link>
            <Link
              to={"/favorites"}
              className="hover:text-black hover:underline border rounded-4xl border-gray-400 text-sm px-3 py-1 ml-2 hover:bg-white"
            >
              Favorites
            </Link>
          </div>
        </div>

        {/* Category Dropdown (visible only when showDropdown is true) */}
        {showDropdown && (
          <div
            className="bg-gray-800 rounded py-5 px-3 absolute w-[300px] mt-2 flex flex-col  md:left-5/12 md:mt-4 z-50 md:w-96 lg:left-3/5"
            ref={categoryDropdownRef}
          >
            <button
              className="hover:border hover:bg-gray-500 bg-gray-700   transition-all ease-in-out duration-300 p-2 rounded"
              onClick={() => handleCategoryClick("movie")}
            >
              Movie
            </button>
            <button
              className="hover:border hover:bg-gray-500 bg-gray-700 mt-2 transition-all ease-in-out duration-300 p-2 rounded"
              onClick={() => handleCategoryClick("series")}
            >
              Series
            </button>
            {/* <button className='hover:border hover:border-gray-400 bg-gray-700 active:border active:bg-gray-400 mt-2 transition-all ease-in-out duration-500 p-2 rounded' onClick={()=>handleCategoryClick('episode')}>Episodes</button> */}
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
