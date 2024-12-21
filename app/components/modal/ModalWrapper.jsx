import { useRef, useEffect } from "react";
import RecipeDetails from "./RecipeDetails";
import RecipeTags from "./RecipeTags";
import ShareLink from "./ShareButton";
import Ingredients from "./Ingredients";

export default function Modal({ recipe, onClose }) {
  const modalRef = useRef(null);

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  }, []);

  if (window != undefined) {
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
  }

  return (
    <dialog ref={modalRef} id="modal" className="modal">
      <div className="modal-box w-11/12 max-w-5xl h-[80vh] overflow-y-auto">
        <h3 id="modaltitle" className="font-bold text-xl mt-2">
          {recipe.name}
        </h3>
        <p id="modaldescription" className="mt-1 mb-3">
          {recipe.description}
        </p>
        <RecipeTags recipe={recipe} />

        <div className="w-full h-[50%]">
          <img
            src={recipe.image}
            id="modalimage"
            className="w-full h-full object-cover rounded-md"
          />
        </div>
        <span
          className="italic text-grey-200/[.06] text-xs"
          dangerouslySetInnerHTML={{ __html: recipe.alt }}
        ></span>

        <Ingredients recipe={recipe} />

        <RecipeDetails recipe={recipe} />
        <div className="modal-action">
          <ShareLink recipe={recipe} />
        </div>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button onClick={() => onClose()}>Close</button>
      </form>
    </dialog>
  );
}
