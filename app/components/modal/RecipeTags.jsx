import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { getIcon } from "../../utils";

export default function RecipeTags({ recipe }) {
  let recipeTypeIcon = getIcon(recipe);

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <span className="badge badge-primary">
        <FontAwesomeIcon className="mr-1" icon={recipeTypeIcon} />
        {recipe.type}
      </span>

      <span className="badge badge-secondary">
        <FontAwesomeIcon className="mr-1" icon={faClock} />
        {recipe.timeneeded} mins
      </span>

      <span className="badge badge-secondary">
        <FontAwesomeIcon className="mr-1" icon={faGlobe} />
        {recipe.cuisine}
      </span>
    </div>
  );
}
