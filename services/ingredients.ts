"use server";

import ingredients from "@/models/ingredients";

const getIngredients = async () => {
  ingredients.find();
};

export { getIngredients };
