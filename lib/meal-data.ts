export type MealType = "breakfast" | "lunch" | "dinner"

export interface FoodItem {
  id: string
  name: string
  category: "protein" | "carb" | "vegetable" | "fruit" | "dairy" | "beverage"
}

export interface DayMeals {
  day: string
  breakfast: FoodItem[]
  lunch: FoodItem[]
  dinner: FoodItem[]
}

export interface WeekData {
  id: string
  label: string
  days: DayMeals[]
}

export const mealData: WeekData[] = [
  {
    id: "week-1",
    label: "Week 1",
    days: [
      {
        day: "Monday",
        breakfast: [
          { id: "1", name: "Oatmeal", category: "carb" },
          { id: "2", name: "Banana", category: "fruit" },
          { id: "3", name: "Almond Milk", category: "dairy" },
        ],
        lunch: [
          { id: "4", name: "Grilled Chicken", category: "protein" },
          { id: "5", name: "Quinoa", category: "carb" },
          { id: "6", name: "Spinach Salad", category: "vegetable" },
        ],
        dinner: [
          { id: "7", name: "Salmon", category: "protein" },
          { id: "8", name: "Brown Rice", category: "carb" },
          { id: "9", name: "Broccoli", category: "vegetable" },
        ],
      },
      {
        day: "Tuesday",
        breakfast: [
          { id: "10", name: "Greek Yogurt", category: "dairy" },
          { id: "11", name: "Granola", category: "carb" },
          { id: "12", name: "Blueberries", category: "fruit" },
        ],
        lunch: [
          { id: "13", name: "Turkey Wrap", category: "protein" },
          { id: "14", name: "Whole Wheat Tortilla", category: "carb" },
          { id: "15", name: "Mixed Greens", category: "vegetable" },
        ],
        dinner: [
          { id: "16", name: "Beef Stir-Fry", category: "protein" },
          { id: "17", name: "Jasmine Rice", category: "carb" },
          { id: "18", name: "Bell Peppers", category: "vegetable" },
        ],
      },
      {
        day: "Wednesday",
        breakfast: [
          { id: "19", name: "Scrambled Eggs", category: "protein" },
          { id: "20", name: "Toast", category: "carb" },
          { id: "21", name: "Orange Juice", category: "beverage" },
        ],
        lunch: [
          { id: "22", name: "Tuna Salad", category: "protein" },
          { id: "23", name: "Crackers", category: "carb" },
          { id: "24", name: "Cherry Tomatoes", category: "vegetable" },
        ],
        dinner: [
          { id: "25", name: "Pasta", category: "carb" },
          { id: "26", name: "Marinara Sauce", category: "vegetable" },
          { id: "27", name: "Meatballs", category: "protein" },
        ],
      },
      {
        day: "Thursday",
        breakfast: [
          { id: "28", name: "Smoothie Bowl", category: "fruit" },
          { id: "29", name: "Chia Seeds", category: "protein" },
          { id: "30", name: "Honey", category: "carb" },
        ],
        lunch: [
          { id: "31", name: "Chicken Caesar", category: "protein" },
          { id: "32", name: "Croutons", category: "carb" },
          { id: "33", name: "Romaine", category: "vegetable" },
        ],
        dinner: [
          { id: "34", name: "Pork Chops", category: "protein" },
          { id: "35", name: "Mashed Potatoes", category: "carb" },
          { id: "36", name: "Green Beans", category: "vegetable" },
        ],
      },
      {
        day: "Friday",
        breakfast: [
          { id: "37", name: "Pancakes", category: "carb" },
          { id: "38", name: "Maple Syrup", category: "carb" },
          { id: "39", name: "Strawberries", category: "fruit" },
        ],
        lunch: [
          { id: "40", name: "Fish Tacos", category: "protein" },
          { id: "41", name: "Corn Tortillas", category: "carb" },
          { id: "42", name: "Cabbage Slaw", category: "vegetable" },
        ],
        dinner: [
          { id: "43", name: "Pizza", category: "carb" },
          { id: "44", name: "Mozzarella", category: "dairy" },
          { id: "45", name: "Mushrooms", category: "vegetable" },
        ],
      },
      {
        day: "Saturday",
        breakfast: [
          { id: "46", name: "Avocado Toast", category: "carb" },
          { id: "47", name: "Poached Egg", category: "protein" },
          { id: "48", name: "Coffee", category: "beverage" },
        ],
        lunch: [
          { id: "49", name: "Burger", category: "protein" },
          { id: "50", name: "Sweet Potato Fries", category: "carb" },
          { id: "51", name: "Lettuce", category: "vegetable" },
        ],
        dinner: [
          { id: "52", name: "Grilled Steak", category: "protein" },
          { id: "53", name: "Baked Potato", category: "carb" },
          { id: "54", name: "Asparagus", category: "vegetable" },
        ],
      },
      {
        day: "Sunday",
        breakfast: [
          { id: "55", name: "French Toast", category: "carb" },
          { id: "56", name: "Bacon", category: "protein" },
          { id: "57", name: "Fresh Berries", category: "fruit" },
        ],
        lunch: [
          { id: "58", name: "Roast Chicken", category: "protein" },
          { id: "59", name: "Roasted Vegetables", category: "vegetable" },
          { id: "60", name: "Gravy", category: "carb" },
        ],
        dinner: [
          { id: "61", name: "Soup", category: "vegetable" },
          { id: "62", name: "Bread", category: "carb" },
          { id: "63", name: "Cheese", category: "dairy" },
        ],
      },
    ],
  },
  {
    id: "week-2",
    label: "Week 2",
    days: [
      {
        day: "Monday",
        breakfast: [
          { id: "64", name: "Overnight Oats", category: "carb" },
          { id: "65", name: "Almonds", category: "protein" },
          { id: "66", name: "Apple", category: "fruit" },
        ],
        lunch: [
          { id: "67", name: "Shrimp Salad", category: "protein" },
          { id: "68", name: "Avocado", category: "vegetable" },
          { id: "69", name: "Citrus Dressing", category: "beverage" },
        ],
        dinner: [
          { id: "70", name: "Lamb Chops", category: "protein" },
          { id: "71", name: "Couscous", category: "carb" },
          { id: "72", name: "Roasted Carrots", category: "vegetable" },
        ],
      },
      {
        day: "Tuesday",
        breakfast: [
          { id: "73", name: "Cottage Cheese", category: "dairy" },
          { id: "74", name: "Peaches", category: "fruit" },
          { id: "75", name: "Walnuts", category: "protein" },
        ],
        lunch: [
          { id: "76", name: "BLT Sandwich", category: "protein" },
          { id: "77", name: "Sourdough", category: "carb" },
          { id: "78", name: "Tomato Soup", category: "vegetable" },
        ],
        dinner: [
          { id: "79", name: "Chicken Curry", category: "protein" },
          { id: "80", name: "Basmati Rice", category: "carb" },
          { id: "81", name: "Naan Bread", category: "carb" },
        ],
      },
      {
        day: "Wednesday",
        breakfast: [
          { id: "82", name: "Protein Shake", category: "protein" },
          { id: "83", name: "Banana", category: "fruit" },
          { id: "84", name: "Peanut Butter", category: "protein" },
        ],
        lunch: [
          { id: "85", name: "Cobb Salad", category: "protein" },
          { id: "86", name: "Blue Cheese", category: "dairy" },
          { id: "87", name: "Hard Boiled Egg", category: "protein" },
        ],
        dinner: [
          { id: "88", name: "BBQ Ribs", category: "protein" },
          { id: "89", name: "Cornbread", category: "carb" },
          { id: "90", name: "Coleslaw", category: "vegetable" },
        ],
      },
      {
        day: "Thursday",
        breakfast: [
          { id: "91", name: "Bagel", category: "carb" },
          { id: "92", name: "Cream Cheese", category: "dairy" },
          { id: "93", name: "Smoked Salmon", category: "protein" },
        ],
        lunch: [
          { id: "94", name: "Veggie Burger", category: "protein" },
          { id: "95", name: "Brioche Bun", category: "carb" },
          { id: "96", name: "Pickles", category: "vegetable" },
        ],
        dinner: [
          { id: "97", name: "Shrimp Scampi", category: "protein" },
          { id: "98", name: "Linguine", category: "carb" },
          { id: "99", name: "Garlic Bread", category: "carb" },
        ],
      },
      {
        day: "Friday",
        breakfast: [
          { id: "100", name: "Acai Bowl", category: "fruit" },
          { id: "101", name: "Coconut Flakes", category: "carb" },
          { id: "102", name: "Kiwi", category: "fruit" },
        ],
        lunch: [
          { id: "103", name: "Poke Bowl", category: "protein" },
          { id: "104", name: "Sushi Rice", category: "carb" },
          { id: "105", name: "Edamame", category: "vegetable" },
        ],
        dinner: [
          { id: "106", name: "Tacos", category: "protein" },
          { id: "107", name: "Refried Beans", category: "carb" },
          { id: "108", name: "Guacamole", category: "vegetable" },
        ],
      },
      {
        day: "Saturday",
        breakfast: [
          { id: "109", name: "Waffles", category: "carb" },
          { id: "110", name: "Whipped Cream", category: "dairy" },
          { id: "111", name: "Mixed Berries", category: "fruit" },
        ],
        lunch: [
          { id: "112", name: "Club Sandwich", category: "protein" },
          { id: "113", name: "Chips", category: "carb" },
          { id: "114", name: "Pickle Spear", category: "vegetable" },
        ],
        dinner: [
          { id: "115", name: "Duck Breast", category: "protein" },
          { id: "116", name: "Wild Rice", category: "carb" },
          { id: "117", name: "Roasted Beets", category: "vegetable" },
        ],
      },
      {
        day: "Sunday",
        breakfast: [
          { id: "118", name: "Eggs Benedict", category: "protein" },
          { id: "119", name: "English Muffin", category: "carb" },
          { id: "120", name: "Hollandaise", category: "dairy" },
        ],
        lunch: [
          { id: "121", name: "Beef Stew", category: "protein" },
          { id: "122", name: "Crusty Bread", category: "carb" },
          { id: "123", name: "Root Vegetables", category: "vegetable" },
        ],
        dinner: [
          { id: "124", name: "Sushi Platter", category: "protein" },
          { id: "125", name: "Miso Soup", category: "vegetable" },
          { id: "126", name: "Seaweed Salad", category: "vegetable" },
        ],
      },
    ],
  },
]
