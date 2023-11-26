import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameDogs } from "../../Redux/Actions/actions";
import style from "./SearchBar.module.css";

const SearchBar = () => {
  const disptach = useDispatch();
  const [name, setName] = useState("");

  const handleInputChange = (event) => {
    event.preventDefault();
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    disptach(getNameDogs(name));
  };

  return (
    <div className={style.searchContainer}>
      <input
        className={style.searchInput}
        type="text"
        placeholder="Search Dogs..."
        onChange={(event) => handleInputChange(event)}
      ></input>
      <button
        className={style.searchButton}
        type="submit"
        onClick={(event) => handleSubmit(event)}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;