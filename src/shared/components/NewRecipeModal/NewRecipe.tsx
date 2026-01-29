import React from "react";
import OpenModalButton from "./OpenModalButton";
import ModalBody from "./ModalBody";
import Modal from "@shared/components/Modal";



import { Ingredient } from "@core/entities/ingredients/model";
import { useRef, useState } from "react";

type EditRecipe = {
  name: string;
  ingredients: Ingredient[];
};

const NewRecipe = React.forwardRef(({ hideButton = false }: { hideButton?: boolean }, ref) => {
  const [editRecipe, setEditRecipe] = useState<EditRecipe | null>(null);
  const [open, setOpen] = useState(false);

  // Expose openEdit for parent
  React.useImperativeHandle(ref, () => ({
    openEdit: (recipe: EditRecipe) => {
      setEditRecipe(recipe);
      setOpen(true);
    },
    open: () => {
      setEditRecipe(null);
      setOpen(true);
    }
  }));

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <ModalBody
        initialName={editRecipe?.name}
        initialIngredients={editRecipe?.ingredients}
        onAdd={() => setOpen(false)}
      />
    </Modal>
  );
});
NewRecipe.displayName = "NewRecipe";

export default NewRecipe;
