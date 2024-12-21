import { useState } from "react";
import { metricCalculation, imperialCalculation } from "../../utils";

export default function Ingredients({ recipe }) {
  const [currentUnit, setCurrentUnit] = useState("metric");
  function switchMeasuringUnits() {
    setCurrentUnit((prevUnit) =>
      prevUnit === "metric" ? "imperial" : "metric"
    );
  }

  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold mb-4">Ingredients</h2>
      <div className="join mb-4">
        <button
          onClick={switchMeasuringUnits}
          className={`btn join-item ${
            currentUnit === "metric" ? "btn-primary" : ""
          }`}
        >
          Metric
        </button>
        <button
          onClick={switchMeasuringUnits}
          className={`btn join-item ${
            currentUnit === "imperial" ? "btn-primary" : ""
          }`}
        >
          Imperial
        </button>
      </div>
      <div>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>
            {ingredient.name.charAt(0).toUpperCase() + ingredient.name.slice(1)}{" "}
            -{" "}
            {currentUnit === "metric"
              ? metricCalculation(ingredient.grams)
              : imperialCalculation(ingredient.grams)}
          </li>
        ))}
      </div>
    </div>
  );
}
