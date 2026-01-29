import React, { useRef } from "react";
import { useSearchParams } from "next/navigation";
import NewRecipe from "@/src/shared/components/NewRecipeModal/NewRecipe";
import { recipesStore } from "@features/recipes/store";
import SearchBar from "@/src/shared/components/SearchBar";
import Text from "@/src/shared/components/topography/Text";
import Badge from "@shared/components/Badge";

const Page = () => {
  const storeRecipes = recipesStore((state) => state.recipes);
  const searchParams = useSearchParams();
  const searchParam = searchParams.get("search")?.toLowerCase() || "";
  const newRecipeRef = useRef<any>(null);
  return (
    <div className="mx-4">
      <div className="mx-4 mb-4 mt-2">
        <SearchBar />
      </div>
      <div className="card glass p-3">
        <div className={
          `flex flex-wrap gap-2 ${searchParam ? 'justify-start' : 'justify-between'}`
        }>
          {storeRecipes
            .filter((sr: { name: string }) =>
              sr.name.toLowerCase().includes(searchParam)
            )
            .map((recipe: { name: string; ingredients: any[]; mealType?: string; type?: string }, i: number) => {
              // Ustal typ posiłku (obsługuje mealType i type)
              const typeRaw = recipe.mealType || recipe.type || '';
              // Sprawdź zarówno z diakrytykami jak i bez
              const typeLower = typeof typeRaw === 'string' ? typeRaw.toLowerCase().trim() : '';
              const typeNorm = typeof typeRaw === 'string'
                ? typeRaw
                    .toLowerCase()
                    .normalize('NFD')
                    .replace(/\p{Diacritic}/gu, '')
                : '';
              let badgeColor = 'bg-gray-200 text-gray-900';
              if (
                typeLower.includes('śniadanie') ||
                typeNorm.includes('sniadanie') ||
                typeLower.includes('breakfast')
              ) {
                badgeColor = 'bg-yellow-200 text-yellow-900';
              } else if (
                typeLower.includes('obiad') ||
                typeNorm.includes('obiad') ||
                typeLower.includes('lunch')
              ) {
                badgeColor = 'bg-green-200 text-green-900';
              } else if (
                typeLower.includes('kolacja') ||
                typeNorm.includes('kolacja') ||
                typeLower.includes('dinner')
              ) {
                badgeColor = 'bg-blue-200 text-blue-900';
              }
              // Styl jak w Day.tsx
              const badgeBase = 'inline-block px-4 py-2 text-base font-semibold rounded-lg transition-colors duration-150 m-1';
              return (
                <Badge
                  key={i}
                  color={badgeColor.split(' ')[0]}
                  textColor={badgeColor.split(' ')[1]}
                  className="inline-block px-4 py-2 text-base font-semibold rounded-lg transition-colors duration-150 m-1 w-auto"
                  onClick={() => {
                    if (newRecipeRef.current && newRecipeRef.current.openEdit) {
                      newRecipeRef.current.openEdit({
                        name: recipe.name,
                        ingredients: recipe.ingredients.map((name: string) => ({ name })),
                        mealType: recipe.mealType,
                        type: recipe.type,
                      });
                    }
                  }}
                  title="Edytuj przepis"
                >
                  <Text size="label">{
                    recipe.name
                      ? recipe.name.charAt(0).toUpperCase() + recipe.name.slice(1).toLowerCase()
                      : ''
                  }</Text>
                </Badge>
              );
            })}
        </div>
      </div>
      <NewRecipe ref={newRecipeRef} hideButton />
    </div>
  );
};

export default Page;
