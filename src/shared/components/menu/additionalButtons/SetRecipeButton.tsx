import React from "react";
import Button from "@shared/components/Button";

type Props = {
  newRecipeRef: React.RefObject<{ open: () => void }>;
};

const SetRecipeButton = ({ newRecipeRef }: Props) => {
  return (
    <Button
      variant="white"
      size="md"
      className="ml-4 mr-8"
      onClick={() => {
        newRecipeRef.current?.open();
      }}
    >
      Dodaj przepis
    </Button>
  );
};

export default SetRecipeButton;
