import React from "react";
import ModalBody from "./ModalBody";
import { DaysOfTheWeek } from "@core/const/types";

const AddRecipe = (props: { day: number }) => {
  const fullDayName: string = Object.values(DaysOfTheWeek)[props.day];
  return (
    <>
      <input
        type="checkbox"
        id={`day_modal_${props.day}`}
        className="modal-toggle"
      />
      <div className="modal backdrop-blur-md" role="dialog">
        <div className="modal-box glass max-w-5xl w-full border-2 border-gray-300 shadow-lg rounded-lg">
          <h3 className="font-bold text-lg">{fullDayName}</h3>
          <ModalBody day={props.day} />
        </div>
        <label className="modal-backdrop" htmlFor={`day_modal_${props.day}`}>
          Close
        </label>
      </div>
    </>
  );
};

export default AddRecipe;
