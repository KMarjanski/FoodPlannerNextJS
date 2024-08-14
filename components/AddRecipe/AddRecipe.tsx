import React from "react";
import OpenModalButton from "./OpenModalButton";
import ModalBody from "./ModalBody";

const AddRecipe = (props: { fullDayName: string; getData: object }) => {
  return (
    <>
      <OpenModalButton />
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <ModalBody fullDayName={props.fullDayName} getData={props.getData} />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default AddRecipe;
