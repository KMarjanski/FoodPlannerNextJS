"use client";

import React from "react";

const OpenModalButton = () => {
  return (
    <button
      className="btn text-xl border-none bg-green-400 hover:bg-green-600 absolute right-0 top-0"
      onClick={() => {
        if (document) {
          (
            document.getElementById("my_modal_2") as HTMLFormElement
          ).showModal();
        }
      }}
    >
      +
    </button>
  );
};

export default OpenModalButton;
