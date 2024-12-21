import { useState } from "react";

export default function ShareLink({ recipe }) {
  function handleCopy() {
    const url = `${window.location.origin}#${encodeURIComponent(recipe.name)}`;
    navigator.clipboard.writeText(url);
  }

  return (
    <div className="mt-4">
      <button className="btn btn-primary" onClick={() => handleCopy()}>
        Copy Link to Recipe
      </button>
    </div>
  );
}
