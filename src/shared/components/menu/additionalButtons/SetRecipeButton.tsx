import React from "react";

type Props = {
  newRecipeRef: React.RefObject<{ open: () => void }>;
};

const SetRecipeButton = ({ newRecipeRef }: Props) => {
  return (
    <button
      className="btn btn-white ml-4 mr-8"
      onClick={() => {
        newRecipeRef.current?.open();
      }}
    >
      Dodaj przepis
    </button>
  );
};

export default SetRecipeButton;
