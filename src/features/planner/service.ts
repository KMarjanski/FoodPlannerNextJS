"use server";

import Planner, { Planner as PlannerModel } from "@features/planner/model";




// Pusty planner zgodny ze schematem

const emptyDay = { breakfast: [], lunch: [], dinner: [] };
const emptyWeek = {
  MON: { ...emptyDay },
  TUE: { ...emptyDay },
  WED: { ...emptyDay },
  THU: { ...emptyDay },
  FRI: { ...emptyDay },
  SAT: { ...emptyDay },
  SUN: { ...emptyDay },
};
const emptyPlanner = {
  weeks: [ { ...emptyWeek } ]
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
  // Nowa struktura: kopiuj tylko pole weeks (tablica tygodni)
  if (!Array.isArray((planner as any).weeks)) {
    return { weeks: [] } as any;
  }
  // Dla każdego tygodnia przefiltruj posiłki
  const dayKeys = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"] as const;
  const sanitizedWeeks = (planner as any).weeks.map((week: any) => {
    const sanitizedWeek: any = {};
    for (const day of dayKeys) {
      const meals = week[day] || {};
      sanitizedWeek[day] = {
        breakfast: filterRecipesArray(meals.breakfast),
        lunch: filterRecipesArray(meals.lunch),
        dinner: filterRecipesArray(meals.dinner),
      };
    }
    return sanitizedWeek;
  });
  return { weeks: sanitizedWeeks } as any;
}


const setPlanner = async (newPlanner: PlannerModel) => {
  // Filtruj planner przed zapisem
  const sanitizedPlanner = sanitizePlanner(newPlanner);
  console.log('PLANNER ZAPISYWANY DO BAZY:', JSON.stringify(sanitizedPlanner, null, 2));
  // Usuń wszystkie stare dokumenty (jeśli masz tylko jeden planer)
  await Planner.deleteMany({});
  // Utwórz nowy dokument z czystą strukturą
  const created = await Planner.create(sanitizedPlanner);
  return JSON.parse(JSON.stringify(created));
};

export { getPlanner, setPlanner };
