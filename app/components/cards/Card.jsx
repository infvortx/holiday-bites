import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faGlobe } from "@fortawesome/free-solid-svg-icons";

export default function Card({ recipe, openModal }) {
  return (
    <div className="card card-compact bg-secondary shadow-xl transition-transform transform hover:scale-105">
      <figure>
        <img
          src={recipe.image}
          alt={recipe.alt}
          className="w-full h-48 object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-lg font-bold">{recipe.name}</h2>
        <p>{recipe.description}</p>
        <div className="card-actions flex justify-between items-center mt-4">
          <div className="flex items-center gap-4">
            <FontAwesomeIcon className="h-5 w-5 text-gray-100" icon={faGlobe} />
            <span className="text-sm">{recipe.cuisine}</span>

            <div className="flex items-center gap-2">
              <FontAwesomeIcon
                className={`h-5 w-5 ${
                  recipe.timeneeded >= 90
                    ? "text-red-500"
                    : recipe.timeneeded >= 60
                    ? "text-orange-500"
                    : "text-green-500"
                }`}
                icon={faClock}
              />
              <span className="text-sm">{recipe.timeneeded || "N/A"} mins</span>
            </div>
          </div>
          <button onClick={() => openModal(recipe)} className="btn btn-primary">
            View Recipe
          </button>
        </div>
      </div>
    </div>
  );
}
