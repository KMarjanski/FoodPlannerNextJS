import React from "react";
import Badge from "@shared/components/Badge";
import Text from "@shared/components/topography/Text";

interface MealSectionProps {
  label: string;
  recipes: Array<{ name?: string } | null>;
  badgeColor: string;
  badgeTextColor: string;
  emptyText?: string;
  onBadgeClick?: (recipe: any) => void;
  selectedRecipes?: Array<{ name?: string } | null>;
  selectedBadgeColor?: string;
  selectedBadgeTextColor?: string;
  onSelectedBadgeClick?: (recipe: any) => void;
  showTwoColumns?: boolean;
  leftTitle?: string;
  rightTitle?: string;
}

const MealSection: React.FC<MealSectionProps> = ({
  label,
  recipes,
  badgeColor,
  badgeTextColor,
  emptyText = "",
  onBadgeClick,
  selectedRecipes = [],
  selectedBadgeColor = "",
  selectedBadgeTextColor = "",
  onSelectedBadgeClick,
  showTwoColumns = false,
  leftTitle = "",
  rightTitle = "",
}) => (
  <div className="flex flex-col mb-4 w-full">
    <div className="flex flex-row w-full items-center mb-1">
      <span className="font-bold text-lg min-w-[120px] text-left mr-16 select-none text-white">{label}</span>
      {showTwoColumns && (
        <>
          <div className="flex-1 text-xs text-gray-500 font-semibold text-left pl-2">{leftTitle}</div>
          <div className="flex-1 text-xs text-gray-500 font-semibold text-right pr-2">{rightTitle}</div>
        </>
      )}
    </div>
    {showTwoColumns ? (
      <div className="flex flex-row w-full items-stretch">
        {/* Dostępne przepisy */}
        <div className="flex-1 flex flex-wrap gap-2 justify-start pr-20 max-h-48 overflow-y-auto">
          {recipes.map((recipe, i) => (
            <Badge
              key={recipe?.name + "-add-" + i}
              color={badgeColor}
              textColor={badgeTextColor}
              className="cursor-pointer"
              onClick={onBadgeClick ? () => onBadgeClick(recipe) : undefined}
            >
              {recipe?.name}
            </Badge>
          ))}
        </div>
        {/* Przypisane przepisy */}
        <div className="flex-1 flex flex-wrap gap-2 justify-end pl-20 w-full content-start max-h-48 overflow-y-auto">
          {selectedRecipes.length === 0 && (
            <span className="text-gray-400 text-xs">Brak</span>
          )}
          {selectedRecipes
            .filter((recipe) => recipe && recipe.name)
            .map((recipe, i) => (
              <Badge
                key={recipe?.name + "-remove-" + i}
                color={selectedBadgeColor}
                textColor={selectedBadgeTextColor}
                className="self-start cursor-pointer hover:bg-red-400 hover:text-white"
                onClick={onSelectedBadgeClick ? () => onSelectedBadgeClick(recipe) : undefined}
              >
                {recipe?.name}
              </Badge>
            ))}
        </div>
      </div>
    ) : (
      <div className="flex flex-wrap gap-2 justify-center mt-1">
        {(recipes.length > 0 ? recipes : [null]).map((meal, i) => (
          <Badge
            key={label + "-" + i}
            color={meal && meal.name ? badgeColor : "bg-transparent border-none"}
            textColor={meal && meal.name ? badgeTextColor : ""}
            className="px-4 py-2 text-base font-semibold rounded-lg transition-colors duration-150"
          >
            <Text>{meal && meal.name ? meal.name : emptyText}</Text>
          </Badge>
        ))}
      </div>
    )}
  </div>
);

export default MealSection;
