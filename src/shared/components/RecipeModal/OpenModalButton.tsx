"use client";

import React from "react";

const OpenModalButton = (props: { day: number }) => {
  return (
      <label
        htmlFor={`day_modal_${props.day}`}
        className="bg-transparent text-green-700 absolute right-0 top-0 shadow-none border-none px-3 py-1 cursor-pointer rounded-full group"
        style={{ backdropFilter: 'blur(2px)', borderRadius: '16px', border: '2px solid transparent' }}
    >
        <span className="relative inline-block text-4xl">
          <span className="absolute inset-0 text-green-400 opacity-75 group-hover:animate-ping select-none pointer-events-none">+</span>
          <span className="relative z-10 text-green-700">+</span>
        </span>
    </label>
  );
};

export default OpenModalButton;
