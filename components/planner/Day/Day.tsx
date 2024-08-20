import AddRecipe from "@/components/AddRecipe/AddRecipe";
import { daysOfTheWeek } from "@/models/enums";

const Day = (props: { day: number; meals: string[] }) => {
  const day: number = props.day;
  const meals: string[] = props.meals;
  const fullDayName: string = Object.values(daysOfTheWeek)[day];
  return (
    <div className="card glass">
      <div className="card-body pt-3">
        <div className="inline-block">
          <h2 className="card-title w-0 inline-block">{fullDayName}</h2>
          <AddRecipe fullDayName={fullDayName} />
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
                {meal}
              </div>
            );
          })}
        </center>
      </div>
    </div>
  );
};

export default Day;
