import React from "react";
import OpenModalButton from "./OpenModalButton";
import ModalBody from "./ModalBody";

const NewRecipe = () => {
  return (
    <>
      <OpenModalButton />
      <dialog id={`new_recipe_modal`} className="modal">
        <div className="modal-box">
          <ModalBody />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default NewRecipe;
