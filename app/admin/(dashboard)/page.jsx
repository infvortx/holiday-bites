"use client";

import { getToken } from "../../firebase";
import { useState } from "react";
import CardWrapper from "./components/CardWrapper";
import Editor from "./components/Editor";

export default function Admin() {
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  getToken().then((token) => {
    if (token == null) {
      if (window != undefined) {
        window.location.href = "/admin/login";
      }
    }
  });

  function handleAddRecipe() {
    setSelectedRecipe({
      name: "",
      cuisine: "",
      description: "",
      image: "",
      timeneeded: "",
      type: "",
      alt: "",
      fullinstructions: "",
      ingredients: [{ name: "", grams: "" }],
    });
    setIsEditorOpen(true);
  }

  function handleSave(recipe) {
    setIsEditorOpen(false);
  }

  function handleClose() {
    setIsEditorOpen(false);
  }

  return (
    <div className="p-2">
      <button className="btn btn-primary" onClick={handleAddRecipe}>
        Add Recipe
      </button>
      <CardWrapper />
      {isEditorOpen && (
        <Editor
          recipe={selectedRecipe}
          onSave={handleSave}
          onClose={handleClose}
          isNew={true}
        />
      )}
    </div>
  );
}
