"use server";

import Planner, { Planner as PlannerModel } from "@features/planner/model";




// Pusty planner zgodny ze schematem
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

const getPlanner = async () => {
  let doc = await Planner.findOne();
  if (!doc) {
    doc = await Planner.create(emptyPlanner);
  }
  // Zamiana na plain object
  return JSON.parse(JSON.stringify(doc));
};


// Helper: usuń null, stringi i zostaw tylko obiekty Recipe

function filterRecipesArray(arr: any[]): any[] {
  return Array.isArray(arr)
    ? arr
        .filter(
          (item) => item && typeof item === 'object' && typeof item.name === 'string' && Array.isArray(item.ingredients)
        )
        // eslint-disable-next-line no-unused-vars
        .map(({ _id, ...rest }) => rest)
    : [];
}

function sanitizePlanner(planner: PlannerModel): PlannerModel {
  // Kopiuj tylko dni tygodnia, pomiń __v i inne klucze
  const dayKeys = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"] as const;
  const sanitized: any = {};
  for (const day of dayKeys) {
    const meals = planner[day];
    sanitized[day] = {
      breakfast: filterRecipesArray(meals?.breakfast),
      lunch: filterRecipesArray(meals?.lunch),
      dinner: filterRecipesArray(meals?.dinner),
    };
  }
  return sanitized;
}

const setPlanner = async (newPlanner: PlannerModel) => {
  // Filtruj planner przed zapisem
  const sanitizedPlanner = sanitizePlanner(newPlanner);



// ...existing code...
// ...istniejący kod, bez generateCartFromPlanner...
  const doc = await Planner.findOneAndReplace({}, sanitizedPlanner, { returnNewDocument: false });
  if (!doc) return null;
  return JSON.parse(JSON.stringify(doc));
};

export { getPlanner, setPlanner };
