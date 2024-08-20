import { create } from "zustand";
import { Planner } from "@/models/planner";

interface PlannerState {
  original: Planner;
  planner: Planner;
  setPlanner: (newPlanner: Planner) => void;
  initPlanner: (newPlanner: Planner) => void;
  resetPlanner: () => void;
}

const plannerStore = create<PlannerState>()((set) => ({
  original: { MON: [], TUE: [], WED: [], THU: [], FRI: [], SAT: [], SUN: [] },
  planner: { MON: [], TUE: [], WED: [], THU: [], FRI: [], SAT: [], SUN: [] },
  initPlanner: (newPlanner: Planner) =>
    set(() => ({ planner: newPlanner, original: newPlanner })),
  setPlanner: (newPlanner: Planner) => set(() => ({ planner: newPlanner })),
  resetPlanner: () => {
    return set({
      planner: {
        MON: [],
        TUE: [],
        WED: [],
        THU: [],
        FRI: [],
        SAT: [],
        SUN: [],
      },
    });
  },
}));

export { plannerStore };
