import { getRecipes } from "../../firebase";
import { useState, useEffect } from "react";
import Card from "./Card";
import Skeleton from "./Skeleton";

export default function Cards({
  searchTerm,
  selectedCuisine,
  sortOrder,
  setSelectedRecipe,
}) {
  const [isLoaded, setLoading] = useState(false);
  const [sortedRecipes, setSortedRecipes] = useState([]);

  function openModal(recipe) {
    setSelectedRecipe(recipe);
  }

  useEffect(() => {
    getRecipes().then((data) => {
      const filteredRecipes = data.filter((recipe) => {
        const matchesSearch = recipe.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const matchesCuisine = selectedCuisine
          ? recipe.cuisine === selectedCuisine
          : true;
        return matchesSearch && matchesCuisine;
      });

      const sorted = filteredRecipes.sort((a, b) => {
        if (sortOrder === "asc") {
          return a.timeneeded - b.timeneeded;
        } else {
          return b.timeneeded - a.timeneeded;
        }
      });

      setSortedRecipes(sorted);
      setLoading(true);
    });
  }, [searchTerm, selectedCuisine, sortOrder]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {isLoaded
        ? sortedRecipes.map((recipe) => (
            <Card key={recipe.id} recipe={recipe} openModal={openModal} />
          ))
        : Array.from({ length: 10 }).map((_, index) => (
            <Skeleton key={index} />
          ))}
    </div>
  );
}
