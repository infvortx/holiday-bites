import { useState } from "react";

export default function RecipeDetails({ recipe }) {
    const numericalRemovedInstructions = recipe.fullinstructions.replace(/[0-9]\./g, '');
    const fullInstructions = numericalRemovedInstructions.split('\n');

    return (
        <div className="mt-4">
            <h3 className="text-lg font-semibold">Instructions</h3>
            <ol className="list-decimal pl-6 mt-3">
                {fullInstructions.map((instruction, index) => (
                    <li key={index} className="mb-2">{instruction.trim()}</li>
                ))}
            </ol>
        </div>
    );
}