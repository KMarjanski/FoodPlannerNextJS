import React from "react";
import OpenModalButton from "./OpenModalButton";
import ModalBody from "./ModalBody";



import { Ingredient } from "@core/entities/ingredients/model";
import { Recipe } from "@features/recipes/model";
import { useRef, useState, useCallback } from "react";

type EditRecipe = {
  name: string;
  ingredients: Ingredient[];
};

const NewRecipe = React.forwardRef(({ hideButton = false }: { hideButton?: boolean }, ref) => {
  const [editRecipe, setEditRecipe] = useState<EditRecipe | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Expose openEdit for parent
  React.useImperativeHandle(ref, () => ({
    openEdit: (recipe: EditRecipe) => {
      setEditRecipe(recipe);
      console.log("Opening modal for editing recipe:", recipe);
      dialogRef.current?.showModal();
    },
    open: () => {
      setEditRecipe(null);
      console.log("Opening modal for new recipe");
      dialogRef.current?.showModal();
    }
  }));

  return (
    <>
      {!hideButton && <OpenModalButton />}
      <dialog id={`new_recipe_modal`} className="modal" ref={dialogRef}>
        <div className="modal-box">
          <ModalBody initialName={editRecipe?.name} initialIngredients={editRecipe?.ingredients} />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
});

export default NewRecipe;
