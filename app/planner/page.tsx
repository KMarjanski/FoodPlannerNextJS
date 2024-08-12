import Day from "@/components/planner/Day/Day";
import { getData } from "@/mocks/planner";
import { daysOfTheWeek } from "@/models/enums";

const Planner = () => {
  return (
    <div className="grid grid-cols-6 gap-4 px-4">
      <div></div>
      {Object.keys(daysOfTheWeek).map((key, i) => {
        const getClassName = () => {
          if (i === 0 || i === 2) return "col-start-1 col-end-4";
          else if (i === 1 || i === 3) return "col-start-4 col-end-7";
          else if (i === 4) return "col-start-1 col-end-3";
          else if (i === 5) return "col-start-3 col-end-5";
          else return "col-start-5 col-end-7";
        };
        return (
          <div key={key} className={getClassName()}>
            <Day day={key} getData={getData} />
          </div>
        );
      })}
    </div>
  );
};

export default Planner;
