import { useState, useRef, useEffect } from "react";
import Input from "./Input";
import { updateRecipe, createRecipe, deleteRecipe } from "../../../firebase";

export default function Editor({
  recipe: initialRecipe,
  onSave,
  onClose,
  isNew,
}) {
  const modalRef = useRef(null);
  const [ingredients, setIngredients] = useState(
    initialRecipe.ingredients || [{ name: "", grams: "" }]
  );
  const [recipe, setRecipe] = useState(initialRecipe);

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  }, []);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  }

  function handleIngredientChange(index, e) {
    const { name, value } = e.target;
    const newIngredients = [...ingredients];
    newIngredients[index][name] = value;
    setIngredients(newIngredients);
  }

  function addIngredient() {
    setIngredients([...ingredients, { name: "", grams: "" }]);
  }

  function removeIngredient(index) {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const saveFunction = isNew ? createRecipe : updateRecipe;
    saveFunction({ ...recipe, ingredients }, recipe.id).then((success) => {
      if (success) {
        onSave({ ...recipe, ingredients });
        onClose();
      } else {
        alert("Failed to save recipe.");
      }
    });
  }

  function handleDeleteRecipe() {
    deleteRecipe(recipe.id).then((success) => {
      if (success) {
        onClose();
        if (window != undefined) {
          window.location.reload();
        }
      } else {
        alert("Failed to delete recipe.");
      }
    });
  }

  return (
    <dialog ref={modalRef} id="modal" className="modal">
      <div className="modal-box w-11/12 max-w-5xl h-[80vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <Input
            label="Name"
            name="name"
            value={recipe.name}
            onChange={handleInputChange}
          />
          <Input
            label="Cuisine"
            name="cuisine"
            value={recipe.cuisine}
            onChange={handleInputChange}
          />
          <Input
            label="Description"
            name="description"
            value={recipe.description}
            onChange={handleInputChange}
            type="textarea"
          />
          <Input
            label="Image URL"
            name="image"
            value={recipe.image}
            onChange={handleInputChange}
          />
          <Input
            label="Time Needed (minutes)"
            name="timeneeded"
            value={recipe.timeneeded}
            onChange={handleInputChange}
          />
          <Input
            label="Type"
            name="type"
            value={recipe.type}
            onChange={handleInputChange}
          />
          <Input
            label="Alt Text"
            name="alt"
            value={recipe.alt}
            onChange={handleInputChange}
          />
          <Input
            label="Full Instructions"
            name="fullinstructions"
            value={recipe.fullinstructions}
            onChange={handleInputChange}
            type="textarea"
          />
          <div className="form-control">
            <label className="label">Ingredients</label>
            {ingredients.map((ingredient, index) => (
              <div key={index} className="flex space-x-2">
                <Input
                  name="name"
                  value={ingredient.name}
                  onChange={(e) => handleIngredientChange(index, e)}
                  placeholder="Name"
                />
                <Input
                  name="grams"
                  value={ingredient.grams}
                  onChange={(e) => handleIngredientChange(index, e)}
                  placeholder="Grams"
                />
                <button
                  type="button"
                  onClick={() => removeIngredient(index)}
                  className="btn btn-error"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addIngredient}
              className="btn btn-primary mt-2"
            >
              Add Ingredient
            </button>
          </div>
          <div className="modal-action">
            <button type="button" onClick={onClose} className="btn">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
            {recipe.id !== undefined && (
              <button
                type="button"
                onClick={() => handleDeleteRecipe()}
                className="btn btn-error"
              >
                Delete
              </button>
            )}
          </div>
        </form>
      </div>
    </dialog>
  );
}
