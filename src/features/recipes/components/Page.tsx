import React from "react";
import { useSearchParams } from "next/navigation";
import NewRecipe from "@shared/components/NewRecipeModal/NewRecipe";
import { recipesStore } from "@features/recipes/store";
import SearchBar from "@features/recipes/components/SearchBar";

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
        .filter((sr: { name: string }) =>
          sr.name.toLowerCase().includes(searchParam)
        )
        .map((recipe: { name: string }, i: number) => (
          <div className="badge m-1 p-8 bg-success" key={i}>
            {recipe.name}
          </div>
        ))}
    </div>
  );
};

export default Page;
