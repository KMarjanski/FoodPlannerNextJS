"use client";

import SetPlannerButtons from "./SetPlannerButtons";
import SetCartButtons from "./SetCartButtons";
import { usePathname } from "next/navigation";

const AddButtons = () => {
  const path = usePathname();
  return (
    <>
      {path === "/planner" && (
        <div className="absolute right-0">
          <SetPlannerButtons />
        </div>
      )}
      {path === "/cart" && (
        <div className="absolute right-0">
          <SetCartButtons />
        </div>
      )}
    </>
  );
};

export default AddButtons;
