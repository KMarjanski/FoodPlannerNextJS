"use client";


import SetPlannerButtons from "./SetPlannerButtons";
import SetCartButtons from "./SetCartButtons";
import SetRecipeButton from "./SetRecipeButton";
import NewRecipe from "../../../../shared/components/NewRecipeModal/NewRecipe";
import { usePathname } from "next/navigation";
import React, { useRef } from "react";


const AddButtons = () => {
  const path = usePathname();
  const newRecipeRef = useRef<{ open: () => void }>(null);
  return (
    <>
      {path === "/planer" && (
        <SetPlannerButtons />
      )}
      {path === "/koszyk" && (
        <SetCartButtons />
      )}
      {path === "/przepisy" && (
        <>
          <SetRecipeButton newRecipeRef={newRecipeRef} />
          <NewRecipe ref={newRecipeRef} hideButton={true} />
        </>
      )}
    </>
  );
};

export default AddButtons;
