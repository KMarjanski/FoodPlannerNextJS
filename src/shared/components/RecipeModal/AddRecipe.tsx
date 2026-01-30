import React from "react";
import ModalBody from "./ModalBody";
import { DaysOfTheWeek } from "@core/const/types";
import Modal from "@shared/components/Modal";

const AddRecipe = React.memo((props: { week: number; day: number; onClose?: () => void }) => {
  const fullDayName: string = Object.values(DaysOfTheWeek)[props.day];
  return (
    <Modal open={true} onClose={props.onClose ?? (() => {})} className="max-w-5xl w-full">
      <h3 className="font-bold text-lg mb-2">{fullDayName} (Tydzień {props.week + 1})</h3>
      <ModalBody week={props.week} day={props.day} />
    </Modal>
  );
});
AddRecipe.displayName = "AddRecipe";

export default AddRecipe;
