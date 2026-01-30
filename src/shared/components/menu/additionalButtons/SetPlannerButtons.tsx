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
  // Sprawdź czy wszystkie posiłki w każdym dniu są puste (dla wszystkich tygodni)
  const isEmpty = planner.weeks.every((week) =>
    Object.values(week).every((meals) =>
      Array.isArray(meals.breakfast) && meals.breakfast.length === 0 &&
      Array.isArray(meals.lunch) && meals.lunch.length === 0 &&
      Array.isArray(meals.dinner) && meals.dinner.length === 0
    )
  );
  const handleGenerateRandom = () => {
    alert("Losowanie planu jeszcze niezaimplementowane.");
  };
  return (
    <div className={`flex items-center gap-2 ${!displaySavePlanner ? "mr-4" : ""}`}>
      <label htmlFor="weeks" className="font-semibold text-xs">Ilość tygodni:</label>
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
        className="w-14 h-7 text-center font-semibold text-xs py-1 px-2"
      />
      {displaySavePlanner && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => refresh(originalPlanner)}
        >
          Cofnij zmiany
        </Button>
      )}
      <Button
        variant="primary"
        size="sm"
        onClick={handleSave}
        disabled={isEmpty || !displaySavePlanner}
      >
        Zapisz plan
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={resetPlanner}
        disabled={isEmpty}
      >
        Wyczyść planer
      </Button>
    </div>
  );
}

export default SetPlannerButtons;
