export default function Card({ recipe, onEdit }) {
  return (
    <div className="menu mt-4">
      <div className="flex items-center">
        <img src={recipe.image} className="w-16 h-16 mr-4 rounded-md" />
        <div>
          <h3 className="text-lg font-bold">{recipe.name}</h3>
          <p>{recipe.description}</p>
        </div>
        <button
          className="btn btn-secondary ml-auto"
          onClick={() => onEdit(recipe)}
        >
          Edit
        </button>
      </div>
    </div>
  );
}
