import React from "react";
import OpenModalButton from "./OpenModalButton";
import ModalBody from "./ModalBody";
import { daysOfTheWeek } from "@/models/enums";

const AddRecipe = (props: { day: number }) => {
  const fullDayName: string = Object.values(daysOfTheWeek)[props.day];
  return (
    <>
      <OpenModalButton day={props.day} />
      <dialog id={`my_modal_${props.day}`} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{fullDayName}</h3>
          <ModalBody day={props.day} />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default AddRecipe;
