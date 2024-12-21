"use client";

import Cards from "./components/cards/CardsWrapper";
import Hero from "./components/home/Hero";
import Modal from "./components/modal/ModalWrapper";
import SearchWrapper from "./components/home/Search";
import Footer from "./components/home/Footer";

import { useState, useEffect } from "react";
import { getRecipes } from "./firebase";

export default function Home() {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [uniqueCuisines, setUniqueCuisines] = useState([]);

  useEffect(() => {
    getRecipes().then((data) => {
      const cuisines = Array.from(new Set(data.map((item) => item.cuisine)));
      setUniqueCuisines(cuisines);

      const hash = window.location.hash.slice(1);
      if (hash) {
        const recipe = data.find(
          (item) => encodeURIComponent(item.name) === hash
        );
        if (recipe) {
          setSelectedRecipe(recipe);
        }
      }
    });
  }, []);

  function handleSearch(term) {
    setSearchTerm(term);
  }

  function handleFilter(cuisine) {
    setSelectedCuisine(cuisine);
  }

  function handleSort(order) {
    setSortOrder(order);
  }

  function onClose() {
    setSelectedRecipe(null);
  }

  return (
    <div className="p-10">
      <Hero />
      <SearchWrapper
        onSearch={(term) => handleSearch(term)}
        onFilter={(cuisine) => handleFilter(cuisine)}
        onSort={(order) => handleSort(order)}
        cuisines={uniqueCuisines}
      />
      <Cards
        searchTerm={searchTerm}
        selectedCuisine={selectedCuisine}
        sortOrder={sortOrder}
        setSelectedRecipe={setSelectedRecipe}
      />
      {selectedRecipe && <Modal onClose={onClose} recipe={selectedRecipe} />}
      <Footer />
    </div>
  );
}
