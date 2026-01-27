import { create } from "zustand";
import { Planner } from "@features/planner/model";

interface PlannerState {
  original: Planner;
  planner: Planner;
  setPlanner: (newPlanner: Planner) => void;
  initPlanner: (newPlanner: Planner) => void;
  resetPlanner: () => void;
}

const emptyDay = { breakfast: [], lunch: [], dinner: [] };
const emptyPlanner = {
  MON: { ...emptyDay },
  TUE: { ...emptyDay },
  WED: { ...emptyDay },
  THU: { ...emptyDay },
  FRI: { ...emptyDay },
  SAT: { ...emptyDay },
  SUN: { ...emptyDay },
};

const plannerStore = create<PlannerState>()((set) => ({
  original: { ...emptyPlanner },
  planner: { ...emptyPlanner },
  initPlanner: (newPlanner: Planner) =>
    set(() => ({ planner: newPlanner, original: newPlanner })),
  setPlanner: (newPlanner: Planner) => set(() => ({ planner: newPlanner })),
  resetPlanner: () => set({ planner: { ...emptyPlanner } }),
}));

export { plannerStore };
