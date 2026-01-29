import React from "react";
import ModalBody from "./ModalBody";
import { DaysOfTheWeek } from "@core/const/types";
import Modal from "@shared/components/Modal";

const AddRecipe = React.memo((props: { day: number; onClose?: () => void }) => {
  const fullDayName: string = Object.values(DaysOfTheWeek)[props.day];
  return (
    <Modal open={true} onClose={props.onClose ?? (() => {})} className="max-w-5xl w-full">
      <h3 className="font-bold text-lg mb-2">{fullDayName}</h3>
      <ModalBody day={props.day} />
    </Modal>
  );
});
AddRecipe.displayName = "AddRecipe";

export default AddRecipe;
