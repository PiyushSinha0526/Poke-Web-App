import React, { useState, useEffect } from "react";
import "../css/Navbar.css";
import axios from "axios";

export default function Navbar({
  term,
  getSearchTerm,
  selectedType,
  setSelectedType,
}) {
  const [pokeTypes, setPokeTypes] = useState([]);

  // Get Types of pokemon
  useEffect(() => {
    let source = axios.CancelToken.source();
    axios
      .get("https://pokeapi.co/api/v2/type", { cancelToken: source.token })
      .then((res) => {
        setPokeTypes(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
    return () => source.cancel("CleanUp");
  }, []);

  return (
    <>
      <div className="navbar">
        <div className="logo">Pokemon</div>
        <div className="navbar_select-search">
          <div className="navbar_select">
            <select
              className="navbar_custom-select"
              value={selectedType || "all"}
              onChange={(e) => {
                setSelectedType(e.target.value);
              }}
            >
              <option value="all">All</option>
              {pokeTypes.map((pokeType) => {
                return (
                  <option key={pokeType.name} value={pokeType.name}>
                    {pokeType.name}
                  </option>
                );
              })}
            </select>
          </div>
          <input
            className="navbar_search"
            type="text"
            placeholder="Search..."
            value={term}
            onChange={(e) => getSearchTerm(e.target.value)}
            onClick={(e) => setSelectedType("all")}
          />
        </div>
      </div>
    </>
  );
}
