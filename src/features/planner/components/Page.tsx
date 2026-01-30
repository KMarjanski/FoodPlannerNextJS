
import React, { useState, useCallback } from "react";
import Day from "./Day";
import { plannerStore } from "@features/planner/store";
import { Planner, WeekPlan } from "@features/planner/model";
import AddRecipe from "@/src/shared/components/RecipeModal/AddRecipe";
import { DaysOfTheWeek } from "@core/const/types";
import SectionBox from "@shared/components/SectionBox";

const MemoDay = React.memo(Day);
const MemoAddRecipe = React.memo(AddRecipe);

const Page = () => {
  const storePlanner = plannerStore((state) => state.planner);
  const weeks = plannerStore((state) => state.weeks);
  const [modalState, setModalState] = useState<{ week: number; day: number } | null>(null);

  // Funkcja do generowania dni na podstawie liczby tygodni
  const getDays = useCallback(() => {
    const days = [];
    const dayKeys = Object.keys(DaysOfTheWeek) as (keyof typeof DaysOfTheWeek)[];
    for (let w = 0; w < weeks; w++) {
      for (let d = 0; d < dayKeys.length; d++) {
        days.push({
          week: w,
          dayIndex: d,
          dayKey: dayKeys[d],
          globalIndex: w * dayKeys.length + d,
        });
      }
    }
    return days;
  }, [weeks]);

  // Render
  return (
    <div>
      {/* Jeden globalny modal, otwierany po kliknięciu */}
      {modalState !== null && (
        <MemoAddRecipe week={modalState.week} day={modalState.day} onClose={() => setModalState(null)} />
      )}
      <div className="grid grid-cols-7 gap-4 p-4" style={{ background: '#020202' }}>
        {getDays().map(({ week, dayIndex, dayKey, globalIndex }) => {
          const weekPlan: WeekPlan = storePlanner.weeks[week];
          const typeKey = dayKey as keyof WeekPlan;
          return (
            <div key={week + '-' + dayKey + '-' + globalIndex}>
              <MemoDay day={dayIndex} meals={weekPlan[typeKey]} onOpenModal={() => setModalState({ week, day: dayIndex })} />
              {weeks > 1 && <div className="text-xs text-gray-400 mt-1">Tydzień {week + 1}</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Page;
