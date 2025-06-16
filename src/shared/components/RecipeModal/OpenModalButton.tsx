"use client";

import React from "react";

const OpenModalButton = (props: { day: number }) => {
  return (
    <label
      htmlFor={`day_modal_${props.day}`}
      className="btn text-xl border-none bg-green-400 hover:bg-green-600 absolute right-0 top-0"
    >
      +
    </label>
  );
  return (
    <button
      className="btn text-xl border-none bg-green-400 hover:bg-green-600 absolute right-0 top-0"
      onClick={() => {
        if (document) {
          (
            document.getElementById(`day_modal_${props.day}`) as HTMLFormElement
          ).showModal();
        }
      }}
    >
      +
    </button>
  );
};

export default OpenModalButton;
