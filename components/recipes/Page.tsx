import { recipesStore } from "@/store/recipes";
import React from "react";

const Page = () => {
  const storeRecipes = recipesStore((state) => state.recipes);
  return (
    <div>
      <div>
        <center>
          <input
            className="rounded-r-3xl w-full py-3 px-3 mb-4 text-gray-700 focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Search..."
          />
          <button className="btn absolute right-0 btn-success">+</button>
        </center>
      </div>
      {storeRecipes.map((recipe, i) => (
        <div className="badge m-1 bg-success" key={i}>
          {recipe.name}
        </div>
      ))}
    </div>
  );
};

export default Page;
