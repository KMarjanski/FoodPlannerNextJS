import React from "react";
import { DaysOfTheWeek } from "@core/const/types";
import OpenModalButton from "@/src/shared/components/RecipeModal/OpenModalButton";
import Text from "@shared/components/topography/Text";
import MealSection from "@shared/components/MealSection";
import SectionBox from "@shared/components/SectionBox";
import type { Recipe } from "@features/recipes/model";

type MealPlan = {
  breakfast: Recipe[];
  lunch: Recipe[];
  dinner: Recipe[];
};

const emptyMeals: MealPlan = { breakfast: [], lunch: [], dinner: [] };

const Day = React.memo((props: { day: number; meals?: MealPlan; onOpenModal?: () => void }) => {
  const day: number = props.day;
  const meals: MealPlan = props.meals ?? emptyMeals;
  const breakfast: Recipe[] = Array.isArray(meals.breakfast) ? meals.breakfast : [];
  const lunch: Recipe[] = Array.isArray(meals.lunch) ? meals.lunch : [];
  const dinner: Recipe[] = Array.isArray(meals.dinner) ? meals.dinner : [];
  const fullDayName: string = Object.values(DaysOfTheWeek)[day];

  return (
    <SectionBox className="card">
      <div className="card-body pt-2 pb-2 pl-3 pr-0 pt-0">
        <div className="flex items-center justify-between w-full mb-2 gap-2 relative">
          <div className="flex-1 flex">
            <h2 className="card-title text-lg mt-4 font-bold tracking-wide text-green-500 drop-shadow-sm">
              {fullDayName}
            </h2>
          </div>
          <div onClick={props.onOpenModal} className="flex-shrink-0 ml-2">
            <OpenModalButton day={props.day} />
          </div>
        </div>
        <div className="flex flex-col gap-3 mt-2">
          <MealSection
            label="Śniadanie"
            recipes={breakfast}
            badgeColor="bg-yellow-200"
            badgeTextColor="text-yellow-900"
          />
          <MealSection
            label="Obiad"
            recipes={lunch}
            badgeColor="bg-green-200"
            badgeTextColor="text-green-900"
          />
          <MealSection
            label="Kolacja"
            recipes={dinner}
            badgeColor="bg-blue-200"
            badgeTextColor="text-blue-900"
          />
        </div>
      </div>
    </SectionBox>
  );
});
Day.displayName = "Day";

export default Day;
