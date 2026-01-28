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
        <div className="absolute right-0">
          <SetPlannerButtons />
        </div>
      )}
      {path === "/koszyk" && (
        <div className="absolute right-0">
          <SetCartButtons />
        </div>
      )}
      {path === "/przepisy" && (
        <>
          <div className="absolute right-0">
            <SetRecipeButton newRecipeRef={newRecipeRef} />
          </div>
          <NewRecipe ref={newRecipeRef} hideButton={true} />
        </>
      )}
    </>
  );
};

export default AddButtons;
