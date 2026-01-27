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
    <div className="mx-4">
      <div className="mx-4 mb-4 mt-2">
        <SearchBar />
      </div>
      <div className="card glass p-3">
      <div className="flex flex-wrap justify-between gap-2">
        {storeRecipes
          .filter((sr: { name: string }) =>
            sr.name.toLowerCase().includes(searchParam)
          )
          .map((recipe: { name: string; mealType?: string; type?: string }, i: number) => {
            // Ustal typ posiłku (obsługuje mealType i type)
            const normalize = (str: string) =>
              str
                .toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '');
            const typeRaw = recipe.mealType || recipe.type || '';
            const type = normalize(typeRaw);
            let badgeColor = 'bg-green-200 text-green-900';
            if (type.includes('sniadanie') || type.includes('breakfast')) {
              badgeColor = 'bg-yellow-200 text-yellow-900';
            } else if (type.includes('obiad') || type.includes('lunch')) {
              badgeColor = 'bg-green-200 text-green-900';
            } else if (type.includes('kolacja') || type.includes('dinner')) {
              badgeColor = 'bg-blue-200 text-blue-900';
            }
            // Styl jak w Day.tsx
            const badgeBase = 'inline-block px-4 py-2 text-base font-semibold rounded-lg transition-colors duration-150 m-1';
            return (
              <div className={badgeBase + ' ' + badgeColor} key={i}>
                <Text size="label">{
                  recipe.name
                    ? recipe.name.charAt(0).toUpperCase() + recipe.name.slice(1).toLowerCase()
                    : ''
                }</Text>
              </div>
            );
          })}
      </div>
      </div>
      <NewRecipe hideButton />
    </div>
  );
};

export default Page;
