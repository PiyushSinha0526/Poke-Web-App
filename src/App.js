import { useEffect, useState } from "react";
import "./App.css";

// components
import Pokecard from "./Components/js/Pokecard";
import Navbar from "./Components/js/Navbar";
import ScrollToTop from "./Components/js/ScrollToTop";

// Custom hook
import useAxios from "./Components/js/useAxios";

function App() {
  //calling Custom hook
  const { data: pokes, loading } = useAxios(
    "https://pokeapi.co/api/v2/pokemon?limit=1118"
  );
  // useState
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [showMore, setShowMore] = useState(20);
  const [showMoreBtn, setShowMoreBtn] = useState(true);
  const [filteredPokes, setFilteredPokes] = useState([]);

  // Select Type
  useEffect(() => {
    setSearchTerm("");
    setShowMore(20);
    setShowMoreBtn(true);
    !loading &&
      setFilteredPokes(
        pokes.filter((poke) => {
          if (selectedType === "all") return poke;
          if (
            poke.data.types[0].type.name
              .toLowerCase()
              .includes(selectedType.toLowerCase())
          )
            return poke;
          else if (poke.data.types.length > 1) {
            return poke.data.types[1].type.name
              .toLowerCase()
              .includes(selectedType.toLowerCase());
          }
          return null;
        })
      );
  }, [selectedType, pokes, loading]);

  // Input Search
  useEffect(() => {
    setShowMoreBtn(true);
    !loading &&
      setFilteredPokes(
        pokes.filter((poke) => {
          return poke.data.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        })
      );
  }, [searchTerm, pokes, loading]);

  // show/load more
  function showMoreHandler() {
    if (filteredPokes.length < showMore) {
      setShowMoreBtn(false);
    } else {
      setShowMoreBtn(true);
      setShowMore((prev) => prev + 20);
    }
  }

  
  if (loading) return "Loading....";
  return (
    <div className="App">
      <Navbar
        term={searchTerm}
        getSearchTerm={setSearchTerm}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
      />
      {filteredPokes.slice(0, showMore).map((poke) => {
        return <Pokecard key={poke.data.name} pokeData={poke.data} />;
      })}
      {showMoreBtn && (
        <div className="loadmore noloading">
          <button onClick={showMoreHandler} className="loadmore_btn">
            Load More
          </button>
        </div>
      )}
      <ScrollToTop/>
    </div>
  );
}

export default App;
