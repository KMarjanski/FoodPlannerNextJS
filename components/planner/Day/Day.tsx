import AddRecipe from "@/components/AddRecipe/AddRecipe";
import { daysOfTheWeek } from "@/models/enums";

const Day = (props: { day: string; getData: object }) => {
  const day: string = props.day;
  const getData: object = props.getData;
  const meals: string = getData[day as keyof typeof getData];
  const fullDayName: string = daysOfTheWeek[day as keyof typeof getData];
  return (
    <div className="card glass">
      <div className="card-body pt-3">
        <div className="inline-block">
          <h2 className="card-title w-0 inline-block">{fullDayName}</h2>
          <AddRecipe fullDayName={fullDayName} getData={getData} />
        </div>
        <center>
          <div className="badge bg-green-600 p-3">
            {meals.length > 0 ? meals : "-"}
          </div>
        </center>
      </div>
    </div>
  );
};

export default Day;
