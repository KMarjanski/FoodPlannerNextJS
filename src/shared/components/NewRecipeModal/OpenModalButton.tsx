"use client";

import React from "react";

const OpenModalButton = () => {
  return (
    <button
      className="btn absolute right-0 btn-success"
      onClick={() => {
        if (document) {
          (
            document.getElementById(`new_recipe_modal`) as HTMLFormElement
          ).showModal();
        }
      }}
    >
      +
    </button>
  );
};

export default OpenModalButton;
