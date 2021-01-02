import React, { useState, useEffect, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getSearchResults, removeSearchResults } from "../../store/search";

function SearchField({ searchValue, setSearchValue, closeSearch }) {
  const searchRef = useRef(null);

  // const checkEnter = (e) => {
  //   e.stopPropagation();

  //   if (e.key !== "Enter") return;
  //   closeSearch();
  // };

  // export default function Search() {
  const [term, setTerm] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    const setSearchResults = async () => {
      if (term !== "") {
        await dispatch(getSearchResults(term));
      } else {
        dispatch(removeSearchResults());
      }
    };

    setSearchResults();
  }, [term]);

  const handleChange = (e) => {
    setTerm(e.target.value);
  };

  return (
    <input
      // ref={searchRef}
      type="text"
      placeholder="Search"
      value={term}
      onChange={handleChange}
      required
    />
  );
}

export default function SearchBar() {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const openSearch = (e) => {
    e.stopPropagation();
    setSearchValue("");
    if (!showSearchBar) {
      setShowSearchBar(true);
    }
  };

  const closeSearch = (e) => {
    setShowSearchBar(false);
  };

  useEffect(() => {
    if (!showSearchBar) return;

    document.addEventListener("click", closeSearch);

    return () => {
      document.removeEventListener("click", closeSearch);
    };
  }, [showSearchBar]);

  const [term, setTerm] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    const setSearchResults = async () => {
      if (term !== "") {
        await dispatch(getSearchResults(term));
      } else {
        dispatch(removeSearchResults());
      }
    };

    setSearchResults();
  }, [term]);

  return (
    <div
      onClick={openSearch}
      className={`navbar__search ${
        showSearchBar ? "navbar__search--open" : "navbar__search--closed"
      }`}
    >
      <i className="fas fa-search"></i>
      {showSearchBar && (
        <SearchField
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          closeSearch={closeSearch}
        />
      )}
    </div>
  );
}
