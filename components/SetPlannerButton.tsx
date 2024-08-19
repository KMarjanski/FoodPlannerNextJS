"use client";

import { setPlanner } from "@/services/planner";
import React from "react";

const SetPlannerButton = () => {
  return (
    <button className="btn mr-4" onClick={setPlanner}>
      Set planner
    </button>
  );
};

export default SetPlannerButton;
