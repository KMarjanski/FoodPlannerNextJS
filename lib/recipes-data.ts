export interface Recipe {
  id: string
  name: string
  description: string
  category: string
  tags: string[]
  ingredients: Ingredient[]
  steps: string[]
  prepTime: number
  cookTime: number
}

export interface Ingredient {
  id: string
  name: string
  amount: string
  category: IngredientCategory
}

export type IngredientCategory =
  | "vegetables"
  | "fruits"
  | "dairy"
  | "meat"
  | "seafood"
  | "grains"
  | "spices"
  | "other"

export const ingredientCategories: { value: IngredientCategory; label: string }[] = [
  { value: "vegetables", label: "Vegetables" },
  { value: "fruits", label: "Fruits" },
  { value: "dairy", label: "Dairy" },
  { value: "meat", label: "Meat" },
  { value: "seafood", label: "Seafood" },
  { value: "grains", label: "Grains" },
  { value: "spices", label: "Spices" },
  { value: "other", label: "Other" },
]

export const recipeCategories = [
  "Breakfast",
  "Lunch",
  "Dinner",
  "Snack",
  "Dessert",
  "Appetizer",
]

export const recipeTags = [
  "Quick",
  "Healthy",
  "Vegetarian",
  "Vegan",
  "Gluten-Free",
  "Low-Carb",
  "High-Protein",
  "Comfort Food",
]

export const sampleRecipes: Recipe[] = [
  {
    id: "1",
    name: "Grilled Salmon with Vegetables",
    description: "Fresh Atlantic salmon grilled to perfection with seasonal vegetables.",
    category: "Dinner",
    tags: ["Healthy", "High-Protein", "Quick"],
    ingredients: [
      { id: "i1", name: "Salmon Fillet", amount: "200g", category: "seafood" },
      { id: "i2", name: "Broccoli", amount: "150g", category: "vegetables" },
      { id: "i3", name: "Olive Oil", amount: "2 tbsp", category: "other" },
      { id: "i4", name: "Lemon", amount: "1", category: "fruits" },
      { id: "i5", name: "Garlic", amount: "2 cloves", category: "spices" },
    ],
    steps: [
      "Preheat grill to medium-high heat",
      "Season salmon with salt, pepper, and olive oil",
      "Grill salmon for 4-5 minutes per side",
      "Steam broccoli until tender-crisp",
      "Serve with lemon wedges",
    ],
    prepTime: 10,
    cookTime: 15,
  },
  {
    id: "2",
    name: "Overnight Oats",
    description: "Creamy, no-cook oatmeal perfect for busy mornings.",
    category: "Breakfast",
    tags: ["Quick", "Healthy", "Vegetarian"],
    ingredients: [
      { id: "i6", name: "Rolled Oats", amount: "1 cup", category: "grains" },
      { id: "i7", name: "Greek Yogurt", amount: "1/2 cup", category: "dairy" },
      { id: "i8", name: "Almond Milk", amount: "1 cup", category: "dairy" },
      { id: "i9", name: "Honey", amount: "2 tbsp", category: "other" },
      { id: "i10", name: "Blueberries", amount: "1/2 cup", category: "fruits" },
    ],
    steps: [
      "Combine oats, yogurt, and milk in a jar",
      "Add honey and mix well",
      "Refrigerate overnight",
      "Top with blueberries before serving",
    ],
    prepTime: 5,
    cookTime: 0,
  },
  {
    id: "3",
    name: "Chicken Caesar Salad",
    description: "Classic Caesar salad with grilled chicken breast.",
    category: "Lunch",
    tags: ["High-Protein", "Quick"],
    ingredients: [
      { id: "i11", name: "Chicken Breast", amount: "250g", category: "meat" },
      { id: "i12", name: "Romaine Lettuce", amount: "1 head", category: "vegetables" },
      { id: "i13", name: "Parmesan", amount: "50g", category: "dairy" },
      { id: "i14", name: "Croutons", amount: "1 cup", category: "grains" },
      { id: "i15", name: "Caesar Dressing", amount: "4 tbsp", category: "other" },
    ],
    steps: [
      "Grill chicken breast until cooked through",
      "Chop romaine lettuce",
      "Slice chicken and arrange on lettuce",
      "Add croutons and parmesan",
      "Drizzle with dressing",
    ],
    prepTime: 10,
    cookTime: 15,
  },
  {
    id: "4",
    name: "Vegetable Stir-Fry",
    description: "Colorful medley of fresh vegetables in a savory sauce.",
    category: "Dinner",
    tags: ["Vegan", "Quick", "Healthy"],
    ingredients: [
      { id: "i16", name: "Bell Peppers", amount: "2", category: "vegetables" },
      { id: "i17", name: "Broccoli", amount: "200g", category: "vegetables" },
      { id: "i18", name: "Carrots", amount: "2", category: "vegetables" },
      { id: "i19", name: "Soy Sauce", amount: "3 tbsp", category: "other" },
      { id: "i20", name: "Ginger", amount: "1 inch", category: "spices" },
    ],
    steps: [
      "Chop all vegetables",
      "Heat oil in a wok",
      "Stir-fry vegetables for 5-7 minutes",
      "Add soy sauce and ginger",
      "Serve over rice",
    ],
    prepTime: 15,
    cookTime: 10,
  },
  {
    id: "5",
    name: "Avocado Toast",
    description: "Simple yet satisfying breakfast with creamy avocado.",
    category: "Breakfast",
    tags: ["Vegetarian", "Quick", "Healthy"],
    ingredients: [
      { id: "i21", name: "Sourdough Bread", amount: "2 slices", category: "grains" },
      { id: "i22", name: "Avocado", amount: "1", category: "fruits" },
      { id: "i23", name: "Cherry Tomatoes", amount: "6", category: "vegetables" },
      { id: "i24", name: "Red Pepper Flakes", amount: "1/4 tsp", category: "spices" },
      { id: "i25", name: "Olive Oil", amount: "1 tbsp", category: "other" },
    ],
    steps: [
      "Toast bread until golden",
      "Mash avocado with a fork",
      "Spread avocado on toast",
      "Top with halved tomatoes",
      "Drizzle with olive oil and sprinkle red pepper flakes",
    ],
    prepTime: 5,
    cookTime: 3,
  },
  {
    id: "6",
    name: "Pasta Carbonara",
    description: "Creamy Italian pasta with crispy pancetta and parmesan.",
    category: "Dinner",
    tags: ["Comfort Food", "High-Protein"],
    ingredients: [
      { id: "i26", name: "Spaghetti", amount: "400g", category: "grains" },
      { id: "i27", name: "Pancetta", amount: "150g", category: "meat" },
      { id: "i28", name: "Eggs", amount: "3", category: "dairy" },
      { id: "i29", name: "Parmesan", amount: "100g", category: "dairy" },
      { id: "i30", name: "Black Pepper", amount: "1 tsp", category: "spices" },
    ],
    steps: [
      "Cook pasta according to package",
      "Fry pancetta until crispy",
      "Whisk eggs with parmesan and pepper",
      "Toss hot pasta with pancetta",
      "Add egg mixture off heat and toss quickly",
    ],
    prepTime: 10,
    cookTime: 20,
  },
]

export const masterIngredients: Ingredient[] = [
  { id: "m1", name: "Salmon Fillet", amount: "", category: "seafood" },
  { id: "m2", name: "Chicken Breast", amount: "", category: "meat" },
  { id: "m3", name: "Ground Beef", amount: "", category: "meat" },
  { id: "m4", name: "Pork Chops", amount: "", category: "meat" },
  { id: "m5", name: "Shrimp", amount: "", category: "seafood" },
  { id: "m6", name: "Broccoli", amount: "", category: "vegetables" },
  { id: "m7", name: "Spinach", amount: "", category: "vegetables" },
  { id: "m8", name: "Bell Peppers", amount: "", category: "vegetables" },
  { id: "m9", name: "Carrots", amount: "", category: "vegetables" },
  { id: "m10", name: "Tomatoes", amount: "", category: "vegetables" },
  { id: "m11", name: "Onions", amount: "", category: "vegetables" },
  { id: "m12", name: "Garlic", amount: "", category: "spices" },
  { id: "m13", name: "Potatoes", amount: "", category: "vegetables" },
  { id: "m14", name: "Avocado", amount: "", category: "fruits" },
  { id: "m15", name: "Bananas", amount: "", category: "fruits" },
  { id: "m16", name: "Apples", amount: "", category: "fruits" },
  { id: "m17", name: "Blueberries", amount: "", category: "fruits" },
  { id: "m18", name: "Strawberries", amount: "", category: "fruits" },
  { id: "m19", name: "Milk", amount: "", category: "dairy" },
  { id: "m20", name: "Greek Yogurt", amount: "", category: "dairy" },
  { id: "m21", name: "Cheese", amount: "", category: "dairy" },
  { id: "m22", name: "Butter", amount: "", category: "dairy" },
  { id: "m23", name: "Eggs", amount: "", category: "dairy" },
  { id: "m24", name: "Rice", amount: "", category: "grains" },
  { id: "m25", name: "Pasta", amount: "", category: "grains" },
  { id: "m26", name: "Bread", amount: "", category: "grains" },
  { id: "m27", name: "Oats", amount: "", category: "grains" },
  { id: "m28", name: "Olive Oil", amount: "", category: "other" },
  { id: "m29", name: "Soy Sauce", amount: "", category: "other" },
  { id: "m30", name: "Honey", amount: "", category: "other" },
  { id: "m31", name: "Salt", amount: "", category: "spices" },
  { id: "m32", name: "Black Pepper", amount: "", category: "spices" },
  { id: "m33", name: "Paprika", amount: "", category: "spices" },
  { id: "m34", name: "Cumin", amount: "", category: "spices" },
  { id: "m35", name: "Oregano", amount: "", category: "spices" },
]
