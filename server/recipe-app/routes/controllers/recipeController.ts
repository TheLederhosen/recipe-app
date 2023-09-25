import * as recipeService from "../../services/recipeService.ts";
import { RecipeDto } from "../../global/recipe-dto.ts";

const viewRecipe = async ({ params, response, render }) => {
  const recipe = await recipeService.findRecipeById(params.rId);

  if (recipe === -1) {
    response.redirect("/recipes");
    return;
  }

  const recipeDto: RecipeDto = {
    userId: recipe.user_id,
    title: recipe.title,
    description: recipe.description,
  };
  response.body = recipe;
};

export { viewRecipe };
