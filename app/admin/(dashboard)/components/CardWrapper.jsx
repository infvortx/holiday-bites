import { useState, useEffect } from "react";
import { getRecipes, updateRecipe } from "../../../firebase";
import Card from "./Card";
import Skeleton from "./Skeleton";
import Editor from "./Editor";

export default function CardWrapper() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [editingRecipe, setEditingRecipe] = useState(null);

  useEffect(() => {
    getRecipes().then((recipes) => {
      setRecipes(recipes);
      setIsLoaded(true);
    });
  }, []);

  function handleEdit(recipe) {
    setEditingRecipe(recipe);
  }

  function handleSave(updatedRecipe) {
    updateRecipe(updatedRecipe, updatedRecipe.id).then((success) => {
      if (success) {
        setRecipes((prevRecipes) =>
          prevRecipes.map((recipe) =>
            recipe.id === updatedRecipe.id ? updatedRecipe : recipe
          )
        );
        setEditingRecipe(null);
      }
    });
  }

  function handleClose() {
    setEditingRecipe(null);
  }

  return (
    <div className="p-6">
      {isLoaded ? (
        <div>
          {recipes.map((recipe) => (
            <Card key={recipe.id} recipe={recipe} onEdit={handleEdit} />
          ))}
        </div>
      ) : (
        <div>
          {Array.from({ length: 10 }).map((_, index) => (
            <Skeleton key={index} />
          ))}
        </div>
      )}
      {editingRecipe && (
        <Editor
          recipe={editingRecipe}
          onSave={handleSave}
          onClose={handleClose}
        />
      )}
    </div>
  );
}
