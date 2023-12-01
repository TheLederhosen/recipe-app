import { sql } from "../database/database.ts";

const addRecipe = async (userId: number, title: string, description: string) => {
  await sql`INSERT INTO recipes (user_id, title, description) VALUES (${userId}, ${title}, ${description})`;
};

const findRecipeById = async (recipeId: number) => {
  const rows = await sql`SELECT * FROM recipes WHERE id = ${recipeId}`;

  if (rows.length != 1) {
    return -1;
  } else {
    return rows[0];
  }
};

const findRecipeByUserIdAndTitle = async (userId: number, title: string) => {
  const rows = await sql`SELECT * FROM recipes WHERE user_id = ${userId} AND title = ${title}`;

  if (rows.length != 1) {
    return -1;
  } else {
    return rows[0];
  }
};

const searchForRecipes = async (searchTerm: string) => {
  return await sql`SELECT * FROM recipes WHERE UPPER(title) LIKE UPPER('%' || ${searchTerm} || '%')`;
};

const deleteRecipe = async (recipeId: number) => {
  await sql`DELETE FROM files WHERE recipe_id = ${recipeId}`;

  await sql`DELETE FROM ingredients WHERE recipe_id = ${recipeId}`;

  await sql`DELETE FROM recipes WHERE id = ${recipeId}`;
};

export { addRecipe, findRecipeById, findRecipeByUserIdAndTitle, searchForRecipes, deleteRecipe };
