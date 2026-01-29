import React from "react";
import ModalBody from "./ModalBody";
import { DaysOfTheWeek } from "@core/const/types";
import SectionBox from "@shared/components/SectionBox";

const AddRecipe = React.memo((props: { day: number; onClose?: () => void }) => {
  const fullDayName: string = Object.values(DaysOfTheWeek)[props.day];
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={props.onClose}
      role="dialog"
      aria-modal="true"
    >
      <div onClick={(e: React.MouseEvent) => e.stopPropagation()} style={{ width: "100%" }}>
        <SectionBox
          as="div"
          className="modal-box max-w-5xl w-full border-2 border-gray-300 shadow-lg rounded-lg relative"
        >
          <h3 className="font-bold text-lg mb-2">{fullDayName}</h3>
          <ModalBody day={props.day} />
        </SectionBox>
      </div>
    </div>
  );
});
AddRecipe.displayName = "AddRecipe";

export default AddRecipe;
