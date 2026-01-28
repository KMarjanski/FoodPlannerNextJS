import { ingredientsStore } from "@/src/core/entities/ingredients/store";
import React, { useState, useEffect } from "react";
import LocalSearchBar from "./LocalSearchBar";


import { recipesStore } from "@features/recipes/store";


import { Ingredient } from "@core/entities/ingredients/model";

interface ModalBodyProps {
  onAdd?: () => void;
  initialName?: string;
  initialIngredients?: Ingredient[];
}

const ModalBody = ({ onAdd, initialName = "", initialIngredients = [] }: ModalBodyProps) => {
  const ingredients = ingredientsStore((state) => state.ingredients);
  const setRecipes = recipesStore((state) => state.setRecipes);
  const recipes = recipesStore((state) => state.recipes);
  const [search, setSearch] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState<any[]>(initialIngredients);
  const [recipeName, setRecipeName] = useState(initialName);

  // Update state when props change (for edit mode)
  useEffect(() => {
    // Tryb edycji: ustaw stan tylko jeśli edytujemy istniejący przepis
    if (initialName || (initialIngredients && initialIngredients.length > 0)) {
      if (recipeName !== initialName) setRecipeName(initialName);
      const prevNames = selectedIngredients.map(i => i.name).join(",");
      const nextNames = (initialIngredients ?? []).map(i => i.name).join(",");
      if (prevNames !== nextNames) setSelectedIngredients(initialIngredients);
    }
    // W trybie dodawania nie nadpisuj stanu (pozwól użytkownikowi dodawać składniki)
    // Stan jest już zainicjalizowany pustymi wartościami przez useState
  }, [initialName, initialIngredients]);

  // Helper to check if ingredient is already selected
  const isSelected = (ingredient: any) =>
    selectedIngredients.some((sel: any) => sel.name === ingredient.name);

  // Move ingredient to selected on click
  const handleSelect = (ingredient: any) => {
    if (!isSelected(ingredient)) {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
  };

  // Remove ingredient from selected on click
  const handleRemove = (ingredient: any) => {
    setSelectedIngredients(selectedIngredients.filter((sel: any) => sel.name !== ingredient.name));
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div className="flex items-center mb-4">
        <h2 className="text-left flex-1 mb-0">Nazwa przepisu</h2>
        {initialName ? (
          <>
            <button
              className="btn bg-success ml-2"
              disabled={
                recipeName.trim().length < 3 ||
                selectedIngredients.length < 2 ||
                (recipeName.trim() === initialName?.trim() &&
                  selectedIngredients.map((i: any) => i.name).join(',') === (initialIngredients ?? []).map((i: any) => i.name).join(','))
              }
              title={
                recipeName.trim().length < 3
                  ? 'Podaj nazwę przepisu (min. 3 znaki)'
                  : selectedIngredients.length < 2
                    ? 'Dodaj co najmniej 2 składniki'
                    : (recipeName.trim() === initialName?.trim() &&
                        selectedIngredients.map((i: any) => i.name).join(',') === (initialIngredients ?? []).map((i: any) => i.name).join(','))
                      ? 'Wprowadź zmiany, aby edytować'
                      : ''
              }
              onClick={() => {
                // TODO: implement edit logic
                if (onAdd) onAdd();
              }}
            >
              Edytuj
            </button>
            <button
              className="btn bg-success ml-2"
              disabled={
                recipeName.trim().length < 3 ||
                selectedIngredients.length < 2 ||
                !(
                  recipeName.trim() !== initialName?.trim() &&
                  selectedIngredients.length !== (initialIngredients?.length ?? 0)
                )
              }
              title={
                recipeName.trim().length < 3
                  ? 'Podaj nazwę przepisu (min. 3 znaki)'
                  : selectedIngredients.length < 2
                    ? 'Dodaj co najmniej 2 składniki'
                    : !(
                        recipeName.trim() !== initialName?.trim() &&
                        selectedIngredients.length !== (initialIngredients?.length ?? 0)
                      )
                      ? 'Powiel dostępny tylko jeśli zmieniła się nazwa i liczba składników'
                      : ''
              }
              onClick={() => {
                // Powiel: dodaj nowy przepis na podstawie obecnych danych
                if (recipeName.trim().length >= 3 && selectedIngredients.length >= 2) {
                  const newRecipe = {
                    name: recipeName.trim(),
                    ingredients: selectedIngredients.map((ing) => ing.name),
                  };
                  if (!recipes.some(r => r.name.toLowerCase() === newRecipe.name.toLowerCase())) {
                    setRecipes([...recipes, newRecipe]);
                  }
                  if (onAdd) onAdd();
                }
              }}
            >
              Powiel
            </button>
          </>
        ) : (
          <button
            className="btn bg-success ml-4"
            disabled={recipeName.trim().length < 3 || selectedIngredients.length < 2}
            title={
              recipeName.trim().length < 3
                ? 'Podaj nazwę przepisu (min. 3 znaki)'
                : selectedIngredients.length < 2
                  ? 'Dodaj co najmniej 2 składniki'
                  : ''
            }
            onClick={() => {
              if (recipeName.trim().length >= 3 && selectedIngredients.length >= 2) {
                const newRecipe = {
                  name: recipeName.trim(),
                  ingredients: selectedIngredients.map((ing) => ing.name),
                };
                if (!recipes.some(r => r.name.toLowerCase() === newRecipe.name.toLowerCase())) {
                  setRecipes([...recipes, newRecipe]);
                }
                if (onAdd) onAdd();
              }
            }}
          >
            Dodaj
          </button>
        )}
      </div>
      <input
        type="text"
        placeholder="Wpisz nazwę przepisu"
        className="input input-bordered w-full"
        value={recipeName}
        onChange={e => setRecipeName(e.target.value)}
      />
      
      <hr className="h-px my-8 border-0 bg-gray-500" />
      <h2 className="text-left mb-2">Składniki w przepisie</h2>
      <div className="flex flex-wrap gap-2 mb-2">
        {selectedIngredients.length === 0 && (
          <span className="text-gray-400">Brak wybranych składników</span>
        )}
        {selectedIngredients.map((ingredient, i) => (
          <div
            key={i}
            className="badge p-3 bg-blue-200 text-blue-900 cursor-pointer hover:bg-blue-300"
            onClick={() => handleRemove(ingredient)}
            title="Usuń z przepisu"
          >
            {ingredient.name
              ? ingredient.name
                  .split(' ')
                  .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                  .join(' ')
              : ''}
          </div>
        ))}
      </div>
      <hr className="h-px my-8 border-0 bg-gray-500" />
      <h2 className="text-left">Lista składników</h2>
      <div className="my-2">
        <LocalSearchBar
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Wyszukaj składnik..."
        />
      </div>
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {ingredients
          .filter((ingredient: { category?: string; name?: string }) => ingredient.category !== "Chemia")
          .filter((ingredient: { name?: string }) =>
            !search || (ingredient.name ?? "").toLowerCase().includes(search.toLowerCase())
          )
          .filter((ingredient: { name?: string }) => !isSelected(ingredient))
          .sort((a: { name?: string }, b: { name?: string }) => {
            const normalize = (str?: string) =>
              (str || "")
                .trim()
                .replace(/^[^\p{L}]*/u, "") // usuń znaki nie-będące literą na początku
                .toLocaleLowerCase('pl');
            if (!a.name) return 1;
            if (!b.name) return -1;
            return normalize(a.name).localeCompare(normalize(b.name), 'pl', { sensitivity: 'base' });
          })
          .map(
            (
              ingredient: { name: string | null | undefined },
              i: React.Key | null | undefined
            ) => (
              <div
                key={i}
                className={`badge p-3 bg-success cursor-pointer hover:bg-green-300`}
                onClick={() => handleSelect(ingredient)}
                title="Dodaj do przepisu"
              >
                {ingredient.name
                  ? ingredient.name
                      .split(' ')
                      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                      .join(' ')
                  : ''}
              </div>
            )
          )}
      </div>
    </div>
  );
};

export default ModalBody;
