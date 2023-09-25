import { sql } from "../database/database.ts";

const findRecipeById = async (recipeId) => {
  const rows = await sql`SELECT * FROM recipes WHERE id = ${recipeId}`;

  if (rows.length != 1) {
    return -1;
  } else {
    return rows[0];
  }
};

export { findRecipeById };
