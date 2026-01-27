import React from "react";

const SetRecipeButton = () => {
  return (
    <button
      className="btn btn-white ml-4 mr-8"
      onClick={() => {
        if (document) {
          (
            document.getElementById(`new_recipe_modal`) as HTMLFormElement
          ).showModal();
        }
      }}
    >
      Dodaj przepis
    </button>
  );
};

export default SetRecipeButton;
