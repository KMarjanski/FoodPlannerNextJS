import { setPlanner } from "@features/planner/service";
import { plannerStore } from "@features/planner/store";
import React from "react";
import Button from "@shared/components/Button";
import Text from "../../topography/Text";
import Input from "@shared/components/Input";

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
  const weeks = plannerStore((state) => state.weeks);
  const setWeeks = plannerStore((state) => state.setWeeks);
  // Sprawdź czy wszystkie posiłki w każdym dniu są puste
  const isEmpty = Object.values(planner).every((day) =>
    Object.values(day).every((meals) => meals.length === 0)
  );
  return (
    <div className={`flex items-center gap-4 my-4 ${!displaySavePlanner && "mr-4"}`}>
      <label htmlFor="weeks" className="font-semibold">Ilość tygodni:</label>
      <Input
        id="weeks"
        type="number"
        min={1}
        max={4}
        value={weeks}
        onChange={e => {
          const val = Math.max(1, Math.min(4, Number(e.target.value)));
          setWeeks(val);
        }}
        className="w-20 text-center font-bold text-lg"
      />
      {displaySavePlanner && (
        <Button
          variant="outline"
          size="md"
          className={`${!displaySavePlanner ? "mr-4" : ""}`}
          onClick={() => refresh(originalPlanner)}
        >
          <Text>Cofnij zmiany</Text>
        </Button>
      )}
      {!isEmpty && (
        <Button
          variant="outline"
          size="md"
          className={`${!displaySavePlanner ? "mr-4" : ""}`}
          onClick={resetPlanner}
        >
          <Text>Wyczyść planer</Text>
        </Button>
      )}
      {displaySavePlanner && (
        <Button
          variant="success"
          size="md"
          className="mr-4"
          onClick={() => handleSave()}
        >
          <Text>Zapisz planer</Text>
        </Button>
      )}
    </div>
  );
};

export default SetPlannerButtons;
