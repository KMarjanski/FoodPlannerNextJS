import { DaysOfTheWeek } from "@core/const/types";
import OpenModalButton from "@/src/shared/components/recipeModal/OpenModalButton";
import Text from "@shared/components/topography/Text";

const Day = (props: { day: number; meals: string[] | [] }) => {
  const day: number = props.day;
  const meals: string[] = props.meals;
  const fullDayName: string = Object.values(DaysOfTheWeek)[day];
  return (
    <div className="card glass">
      <div className="card-body pt-3">
        <div className="inline-block">
          <h2 className="card-title w-0 inline-block">{fullDayName}</h2>
          <OpenModalButton day={props.day} />
        </div>
        <center>
          {(meals.length > 0 ? meals : [""]).map((meal, i) => {
            return (
              <div
                key={i}
                className={`badge p-3 ${
                  meal.length > 0 ? "bg-green-600" : "bg-transparent"
                } ${meal.length === 0 && "border-none"}`}
              >
                <Text>{meal}</Text>
              </div>
            );
          })}
        </center>
      </div>
    </div>
  );
};

export default Day;
