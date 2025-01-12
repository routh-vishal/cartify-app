import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function Search() {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate(); 

  function handleSearch(event) {
    if (searchInput.trim()) {
      navigate(`/search`); 
    }
    else event.preventDefault();
  }

  function handleChange(event) {
    const newInput = event.target.value;
    setSearchInput(newInput);
  }

  return (
    <div className="search-container">
      <form className="search-form" onSubmit={handleSearch}>
        <input
          name="searchText"
          type="text"
          placeholder="Search..."
          className="search-input"
          onChange={handleChange}
          value={searchInput}
        />
        <button type="submit" className="search-button">
          <IoIosSearch />
        </button>
      </form>
    </div>
  );
}

export default Search;
