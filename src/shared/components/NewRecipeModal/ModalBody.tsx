import { ingredientsStore } from "@/src/core/entities/ingredients/store";
import React from "react";

const ModalBody = () => {
  const ingredients = ingredientsStore((state) => state.ingredients);

  return (
    <div>
      <h2 className="mb-4 text-left">Recipe name</h2>
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered w-full"
      />
      <hr className="h-px my-8 border-0 bg-gray-500" />
      <h2 className="text-left">Ingredients</h2>
      <hr className="h-px my-8 border-0 bg-gray-500" />
      <h2 className="text-left">Ingredients list</h2>
      {ingredients.map(
        (
          ingredient: { name: string | null | undefined },
          i: React.Key | null | undefined
        ) => (
          <div key={i} className={`badge p-3 bg-success`}>
            {ingredient.name}
          </div>
        )
      )}
      <hr className="h-px my-8 border-0 bg-gray-500" />
      <button className="btn bg-success">Add</button>
    </div>
  );
};

export default ModalBody;
