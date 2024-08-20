"use client";

import { plannerStore } from "@/store/planner";
import React from "react";

const SetPlannerButtons = () => {
  const originalPlanner = plannerStore((state) => state.original);
  const planner = plannerStore((state) => state.planner);
  const displaySavePlanner =
    JSON.stringify(planner) !== JSON.stringify(originalPlanner);
  const resetPlanner = plannerStore((state) => state.resetPlanner);
  const refresh = plannerStore((state) => state.setPlanner);
  return (
    <>
      {displaySavePlanner && (
        <button className="btn mr-4" onClick={() => refresh(originalPlanner)}>
          Refresh
        </button>
      )}
      <button className="btn mr-4" onClick={resetPlanner}>
        Reset planner
      </button>
      {displaySavePlanner && <button className="btn mr-4">Save planner</button>}
    </>
  );
};

export default SetPlannerButtons;
