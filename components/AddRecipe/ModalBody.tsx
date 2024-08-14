import React from "react";

const ModalBody = (props: { fullDayName: string; getData: object }) => {
  return (
    <>
      <h3 className="font-bold text-lg">{props.fullDayName}</h3>
      <p className="py-4">Press ESC key or click outside to close</p>
    </>
  );
};

export default ModalBody;
