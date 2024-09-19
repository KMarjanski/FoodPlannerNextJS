import React from "react";
import ModalBody from "./ModalBody";
import { daysOfTheWeek } from "@/models/enums";

const AddRecipe = (props: { day: number }) => {
  const fullDayName: string = Object.values(daysOfTheWeek)[props.day];
  return (
    <>
      <input
        type="checkbox"
        id={`day_modal_${props.day}`}
        className="modal-toggle"
      />
      <div className="modal backdrop-blur-md" role="dialog">
        <div className="modal-box">
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
