import { ingredientsStore } from "@/src/core/entities/ingredients/store";
import React, { useState, useEffect } from "react";
import LocalSearchBar from "./LocalSearchBar";
import Badge from "@shared/components/Badge";
import SectionBox from "@shared/components/SectionBox";
import Input from "@shared/components/Input";
import Button from "@shared/components/Button";

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
  const [search, setSearch] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState<any[]>(initialIngredients);
  const [recipeName, setRecipeName] = useState(initialName);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

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
  }, [initialName, initialIngredients, recipeName, selectedIngredients]);

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

  // API helpers
  const fetchRecipes = async () => {
    const res = await fetch("/api/recipes");
    const data = await res.json();
    setRecipes(data);
  };

  // Zamknięcie modala przez callback przekazany z rodzica
  const closeModal = () => {
    if (onAdd) onAdd();
  };

  const addRecipe = async () => {
    await fetch("/api/recipes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: recipeName.trim(),
        ingredients: selectedIngredients.map((ing) => ing.name),
      }),
    });
    await fetchRecipes();
    closeModal();
  };

  const editRecipe = async () => {
    await fetch("/api/recipes", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: recipeName.trim(),
        ingredients: selectedIngredients.map((ing) => ing.name),
      }),
    });
    await fetchRecipes();
    closeModal();
  };

  const deleteRecipe = async () => {
    await fetch("/api/recipes", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: initialName.trim() }),
    });
    await fetchRecipes();
    closeModal();
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div className="flex items-center mb-4">
        <h2 className="text-left flex-1 text-white/80 mb-0">Nazwa przepisu</h2>
        {initialName ? (
          <>
            <Button
              variant="error"
              className="ml-2"
              title="Usuń przepis"
              onClick={() => setShowDeleteConfirm(true)}
            >
              Usuń
            </Button>
            {showDeleteConfirm && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                <SectionBox className="bg-white rounded-lg shadow-lg p-6 max-w-xs w-full">
                  <h3 className="text-lg font-semibold text-white/80 mb-4">Potwierdź usunięcie</h3>
                  <p className="mb-6 text-white/80">Czy na pewno chcesz usunąć ten przepis?</p>
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowDeleteConfirm(false)}
                    >
                      Anuluj
                    </Button>
                    <Button
                      variant="error"
                      size="sm"
                      className="text-white"
                      onClick={async () => {
                        await deleteRecipe();
                        setShowDeleteConfirm(false);
                        if (onAdd) onAdd();
                      }}
                    >
                      Usuń
                    </Button>
                  </div>
                </SectionBox>
              </div>
            )}
            <Button
              variant="success"
              className="ml-2"
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
              onClick={initialName ? editRecipe : addRecipe}
            >
              Zapisz
            </Button>
            <Button
              variant="success"
              className="ml-2"
              onClick={addRecipe}
            >
              Dodaj
            </Button>
          </>
        ) : (
          <Button
            variant="success"
            className="ml-4"
            onClick={addRecipe}
          >
            Dodaj składnik
          </Button>
        )}
      </div>
      <Input
        type="text"
        placeholder="Wpisz nazwę przepisu"
        className="w-full"
        value={recipeName}
        onChange={e => setRecipeName(e.target.value)}
      />
      
      <hr className="h-px my-8 border-0 bg-gray-500" />
      <h2 className="text-left text-white/80 mb-2">Składniki w przepisie</h2>
      <div className="flex flex-wrap gap-2 mb-2">
        {selectedIngredients.length === 0 && (
          <span className="text-gray-400">Brak wybranych składników</span>
        )}
        {selectedIngredients.map((ingredient, i) => (
          <Badge
            key={i}
            color="bg-blue-200"
            textColor="text-blue-900"
            className="p-3 cursor-pointer hover:bg-blue-300"
            onClick={() => handleRemove(ingredient)}
            title="Usuń z przepisu"
          >
            {ingredient.name
              ? ingredient.name
                  .split(' ')
                  .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                  .join(' ')
              : ''}
          </Badge>
        ))}
      </div>
      <hr className="h-px my-8 border-0 bg-gray-500" />
      <h2 className="text-left text-white/80">Lista składników</h2>
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
              <Badge
                key={i}
                color="bg-success"
                textColor="text-white"
                className="p-3 cursor-pointer hover:bg-green-300"
                onClick={() => handleSelect(ingredient)}
                title="Dodaj do przepisu"
              >
                {ingredient.name
                  ? ingredient.name
                      .split(' ')
                      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                      .join(' ')
                  : ''}
              </Badge>
            )
          )}
      </div>
    </div>
  );
};

export default ModalBody;
