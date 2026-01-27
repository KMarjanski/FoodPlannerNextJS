import React from "react";
import { useSearchParams } from "next/navigation";
import NewRecipe from "@/src/shared/components/NewRecipeModal/NewRecipe";
import { recipesStore } from "@features/recipes/store";
import SearchBar from "@/src/shared/components/SearchBar";
import Text from "@/src/shared/components/topography/Text";

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
            <Text size="label">{recipe.name}</Text>
          </div>
        ))}
    </div>
  );
};

export default Page;
