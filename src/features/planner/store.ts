/* eslint-disable no-unused-vars */
import { create } from "zustand";
import { Planner, WeekPlan } from "@features/planner/model";
import type { Recipe } from "@features/recipes/model";


interface PlannerState {
  original: Planner;
  planner: Planner;
  setPlanner: (_newPlanner: Planner) => void;
  initPlanner: (_newPlanner: Planner) => void;
  resetPlanner: () => void;
  weeks: number;
  setWeeks: (_weeks: number) => void;
}



const emptyDay = { breakfast: [] as Recipe[], lunch: [] as Recipe[], dinner: [] as Recipe[] };
const emptyWeek: WeekPlan = {
  MON: { ...emptyDay },
  TUE: { ...emptyDay },
  WED: { ...emptyDay },
  THU: { ...emptyDay },
  FRI: { ...emptyDay },
  SAT: { ...emptyDay },
  SUN: { ...emptyDay },
};
const emptyPlanner: Planner = {
  weeks: [ { ...emptyWeek } ]
};



const plannerStore = create<PlannerState>()((set) => ({
  original: { ...emptyPlanner },
  planner: { ...emptyPlanner },
  weeks: emptyPlanner.weeks.length,
  setWeeks: (weeks: number) => set((state) => {
    // Dodaj lub usuń tygodnie w plannerze
    let baseWeeks = Array.isArray(state.planner.weeks) ? state.planner.weeks : [];
    let newWeeks = [...baseWeeks];
    if (weeks > newWeeks.length) {
      // Dodaj nowe puste tygodnie
      for (let i = newWeeks.length; i < weeks; i++) {
        newWeeks.push({ ...emptyWeek });
      }
    } else if (weeks < newWeeks.length) {
      // Usuń nadmiarowe tygodnie
      newWeeks = newWeeks.slice(0, weeks);
    }
    // Jeśli po wszystkim weeks jest puste, dodaj jeden tydzień
    if (newWeeks.length === 0) {
      newWeeks = [{ ...emptyWeek }];
    }
    return { weeks, planner: { ...state.planner, weeks: newWeeks } };
  }),
  initPlanner: (newPlanner: Planner) =>
    set(() => ({
      planner: newPlanner,
      original: newPlanner,
      weeks: Array.isArray(newPlanner.weeks) ? newPlanner.weeks.length : 1,
    })),
  setPlanner: (newPlanner: Planner) => set(() => ({ planner: newPlanner })),
  resetPlanner: () => set({ planner: { ...emptyPlanner }, weeks: emptyPlanner.weeks.length }),
}));

export { plannerStore };
