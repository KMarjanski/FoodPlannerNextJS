"use client";

import React from "react";

const OpenModalButton = (props: { day: number }) => {
  return (
    <button
      className="btn text-xl border-none bg-green-400 hover:bg-green-600 absolute right-0 top-0"
      onClick={() => {
        if (document) {
          (
            document.getElementById(`my_modal_${props.day}`) as HTMLFormElement
          ).showModal();
        }
      }}
    >
      +
    </button>
  );
};

export default OpenModalButton;
