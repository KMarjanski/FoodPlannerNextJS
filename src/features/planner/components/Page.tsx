import React, { useState, useCallback } from "react";
import Day from "./Day";
import { plannerStore } from "@features/planner/store";
import { Planner } from "@features/planner/model";
import AddRecipe from "@/src/shared/components/RecipeModal/AddRecipe";
import { DaysOfTheWeek } from "@core/const/types";
import SectionBox from "@shared/components/SectionBox";

const MemoDay = React.memo(Day);
const MemoAddRecipe = React.memo(AddRecipe);

const Page = () => {
  const storePlanner = plannerStore((state) => state.planner);
  const weeks = plannerStore((state) => state.weeks);
  const [modalDay, setModalDay] = useState<number | null>(null);

  // Funkcja do generowania dni na podstawie liczby tygodni
  const getDays = useCallback(() => {
    const days = [];
    const dayKeys = Object.keys(DaysOfTheWeek) as (keyof typeof DaysOfTheWeek)[];
    for (let w = 0; w < weeks; w++) {
      for (let d = 0; d < dayKeys.length; d++) {
        days.push({
          week: w + 1,
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
      {modalDay !== null && (
        <MemoAddRecipe day={modalDay} onClose={() => setModalDay(null)} />
      )}
      <SectionBox as="div" className="grid grid-cols-6 gap-4 p-4">
        {getDays().map(({ week, dayIndex, dayKey, globalIndex }) => {
          const typeKey = dayKey as keyof Planner;
          const getClassName = () => {
            const i = dayIndex;
            if (i === 0 || i === 2) return "col-start-1 col-end-4";
            else if (i === 1 || i === 3) return "col-start-4 col-end-7";
            else if (i === 4) return "col-start-1 col-end-3";
            else if (i === 5) return "col-start-3 col-end-5";
            else return "col-start-5 col-end-7";
          };
          return (
            <div key={week + '-' + dayKey + '-' + globalIndex} className={getClassName()}>
              <MemoDay day={dayIndex} meals={storePlanner[typeKey]} onOpenModal={() => setModalDay(dayIndex)} />
              {weeks > 1 && <div className="text-xs text-gray-400 mt-1">Tydzień {week}</div>}
            </div>
          );
        })}
      </SectionBox>
    </div>
  );
};

export default Page;
