import { recipesStore } from "@/store/recipes";
import React from "react";
import SearchBar from "./SearchBar";
import NewRecipe from "./NewRecipeModal/NewRecipe";
import { useSearchParams } from "next/navigation";

const Page = () => {
  const storeRecipes = recipesStore((state) => state.recipes);
  const searchParams = useSearchParams();
  const searchParam = searchParams.get("search")?.toLowerCase() || "";
  return (
    <div>
      <div>
        <center>
          <SearchBar />
          <NewRecipe />
        </center>
      </div>
      {storeRecipes
        .filter((sr) => sr.name.toLowerCase().includes(searchParam))
        .map((recipe, i) => (
          <div className="badge m-1 p-8 bg-success" key={i}>
            {recipe.name}
          </div>
        ))}
    </div>
  );
};

export default Page;
