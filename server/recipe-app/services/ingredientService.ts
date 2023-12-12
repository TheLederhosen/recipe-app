import { sql } from "../database/database.ts";

const addIngredient = async (recipeId: number, name: string) => {
  await sql`INSERT INTO ingredients (recipe_id, name) VALUES (${recipeId}, ${name})`;
};

const findAllIngredientsOfRecipe = async (recipeId: number) => {
  return await sql`SELECT * FROM ingredients WHERE recipe_id = ${recipeId}`;
};

const deleteIngredientsOfRecipeById = async (recipeId: number) => {
  return await sql`DELETE FROM ingredients WHERE recipe_id = ${recipeId}`;
};

export { findAllIngredientsOfRecipe, addIngredient, deleteIngredientsOfRecipeById };
