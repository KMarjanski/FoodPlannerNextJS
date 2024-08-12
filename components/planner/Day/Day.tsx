const Day = (props: { day: string; getData: object }) => {
  const day: string = props.day;
  const getData: object = props.getData;
  const meals: string = getData[day as keyof typeof getData];
  return (
    <div className="card glass">
      <div className="card-body pt-3">
        <div className="inline-block">
          <h2 className="card-title w-0 inline-block">{day}</h2>
          <button className="btn text-xl border-none bg-green-400 hover:bg-green-600 inline-block absolute top-0 right-0">
            +
          </button>
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
