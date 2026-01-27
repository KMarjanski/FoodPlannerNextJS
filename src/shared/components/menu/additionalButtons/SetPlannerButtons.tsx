import { setPlanner } from "@features/planner/service";
import { plannerStore } from "@features/planner/store";
import React from "react";
import Text from "../../topography/Text";

const SetPlannerButtons = () => {
  const originalPlanner = plannerStore((state) => state.original);
  const planner = plannerStore((state) => state.planner);
  const displaySavePlanner =
    JSON.stringify(planner) !== JSON.stringify(originalPlanner);
  const resetPlanner = plannerStore((state) => state.resetPlanner);
  const refresh = plannerStore((state) => state.setPlanner);
  const handleSave = async () => {
    const clearPlanner = JSON.parse(JSON.stringify(planner));
    await setPlanner(clearPlanner);
    window.location.reload();
  };
  // Sprawdź czy wszystkie posiłki w każdym dniu są puste
  const isEmpty = Object.values(planner).every((day) =>
    Object.values(day).every((meals) => meals.length === 0)
  );
  return (
    <>
      {displaySavePlanner && (
        <button className="btn mr-4" onClick={() => refresh(originalPlanner)}>
          <Text>Cofnij zmiany</Text>
        </button>
      )}
      {!isEmpty && (
        <button className="btn mr-4" onClick={resetPlanner}>
          <Text>Wyczyść planer</Text>
        </button>
      )}
      {displaySavePlanner && (
        <button className="btn mr-4 btn-success" onClick={() => handleSave()}>
          <Text>Zapisz planer</Text>
        </button>
      )}
    </>
  );
};

export default SetPlannerButtons;
