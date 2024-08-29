"use client";

import { setPlanner } from "@/services/planner";
import { plannerStore } from "@/store/planner";
import { usePathname } from "next/navigation";
import React from "react";

const SetPlannerButtons = () => {
  const path = usePathname();
  const isCorrectPath = path === "/planner";
  const originalPlanner = plannerStore((state) => state.original);
  const planner = plannerStore((state) => state.planner);
  const displaySavePlanner =
    JSON.stringify(planner) !== JSON.stringify(originalPlanner);
  const resetPlanner = plannerStore((state) => state.resetPlanner);
  const refresh = plannerStore((state) => state.setPlanner);
  const handleSave = () => {
    const clearPlanner = JSON.parse(JSON.stringify(planner));
    setPlanner(clearPlanner);
    window.location.reload();
  };
  const isEmpty = Object.values(planner).every((a) => !a.length);
  if (!isCorrectPath) return null;
  return (
    <>
      {displaySavePlanner && (
        <button className="btn mr-4" onClick={() => refresh(originalPlanner)}>
          Refresh
        </button>
      )}
      {!isEmpty && (
        <button className="btn mr-4" onClick={resetPlanner}>
          Reset planner
        </button>
      )}
      {displaySavePlanner && (
        <button className="btn mr-4 btn-success" onClick={() => handleSave()}>
          Save planner
        </button>
      )}
    </>
  );
};

export default SetPlannerButtons;
