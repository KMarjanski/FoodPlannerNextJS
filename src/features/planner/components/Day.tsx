import { DaysOfTheWeek } from "@core/const/types";
import OpenModalButton from "@/src/shared/components/RecipeModal/OpenModalButton";
import Text from "@shared/components/topography/Text";


type MealPlan = {
  breakfast: string[];
  lunch: string[];
  dinner: string[];
};


const emptyMeals: MealPlan = { breakfast: [], lunch: [], dinner: [] };

const Day = (props: { day: number; meals?: MealPlan }) => {
  const day: number = props.day;
  const meals: MealPlan = props.meals ?? emptyMeals;
  // Zapewnij, że każda właściwość to tablica
  const breakfast = Array.isArray(meals.breakfast) ? meals.breakfast : [];
  const lunch = Array.isArray(meals.lunch) ? meals.lunch : [];
  const dinner = Array.isArray(meals.dinner) ? meals.dinner : [];
  const fullDayName: string = Object.values(DaysOfTheWeek)[day];
  // Kolory badge jak w modalu
  const badgeColors: Record<string, string> = {
    breakfast: 'bg-yellow-200 text-yellow-900',
    lunch: 'bg-green-200 text-green-900',
    dinner: 'bg-blue-200 text-blue-900',
  };
  const badgeEmptyColors = 'bg-transparent border-none';
  const badgeBase = 'px-4 py-2 text-base font-semibold rounded-lg transition-colors duration-150';

  return (
    <div className="card glass">
      <div className="card-body pt-3">
        <div className="inline-block w-full flex items-center justify-between mb-2">
          <h2 className="card-title text-lg font-bold tracking-wide text-white/80 drop-shadow-sm">{fullDayName}</h2>
          <OpenModalButton day={props.day} />
        </div>
        <div className="flex flex-col gap-3 mt-2">
          <div>
            <span className="font-semibold text-base">Śniadanie</span>
            <div className="flex flex-wrap gap-2 justify-center mt-1">
              {(breakfast.length > 0 ? breakfast : [""]).map((meal, i) => (
                <div
                  key={"breakfast-" + i}
                  className={
                    badgeBase + ' ' + (meal.length > 0 ? badgeColors.breakfast : badgeEmptyColors)
                  }
                >
                  <Text>{meal}</Text>
                </div>
              ))}
            </div>
          </div>
          <div>
            <span className="font-semibold text-base">Obiad</span>
            <div className="flex flex-wrap gap-2 justify-center mt-1">
              {(lunch.length > 0 ? lunch : [""]).map((meal, i) => (
                <div
                  key={"lunch-" + i}
                  className={
                    badgeBase + ' ' + (meal.length > 0 ? badgeColors.lunch : badgeEmptyColors)
                  }
                >
                  <Text>{meal}</Text>
                </div>
              ))}
            </div>
          </div>
          <div>
            <span className="font-semibold text-base">Kolacja</span>
            <div className="flex flex-wrap gap-2 justify-center mt-1">
              {(dinner.length > 0 ? dinner : [""]).map((meal, i) => (
                <div
                  key={"dinner-" + i}
                  className={
                    badgeBase + ' ' + (meal.length > 0 ? badgeColors.dinner : badgeEmptyColors)
                  }
                >
                  <Text>{meal}</Text>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Day;
