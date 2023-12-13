import * as recipeService from "../../services/recipeService.ts";
import * as ingredientService from "../../services/ingredientService.ts";
import { RecipeDto } from "../../global/recipe-dto.ts";
import { validasaur, Context } from "../../deps.ts";

const recipeValidationRules = {
  title: [validasaur.required, validasaur.minLength(1)],
  description: [validasaur.required, validasaur.minLength(1)],
  ingredients: [validasaur.required],
  // TODO: do validation
};

const getRecipeData = async (ctx: Context) => {
  const body = ctx.request.body({ type: "json" });
  const jsonBody = await body.value;
  return {
    title: jsonBody.title,
    description: jsonBody.description,
    ingredients: jsonBody.ingredients,
  };
};

const searchRecipe = async (ctx: Context) => {
  const searchTerm = ctx.request.url.searchParams.get("searchTerm");
  const recipes = await recipeService.searchForRecipes(searchTerm || "");
  ctx.response.body = recipes;
};

const viewRecipe = async (ctx: any) => {
  const rId = ctx.params.rId
  const recipe = await recipeService.findRecipeById(rId);
  const ingredients = await ingredientService.findAllIngredientsOfRecipe(rId);

  if (recipe === -1) {
    ctx.response.status = 400;
    ctx.response.body = "Recipe could not be found!";
    return;
  }

  const recipeDto: RecipeDto = {
    id: recipe.id,
    userId: recipe.user_id,
    title: recipe.title,
    description: recipe.description,
    ingredients: ingredients
  };

  ctx.response.body = recipeDto;
};

const addRecipe = async (ctx: Context) => {
  const recipeData = await getRecipeData(ctx);
  const [passes, errors] = await validasaur.validate(
    recipeData,
    recipeValidationRules,
  );
  
  const recipe = await recipeService.findRecipeByUserIdAndTitle(ctx.state.user.id, recipeData.title);

  if (recipe !== -1) {
    console.error("Unique key constraint violation!");
    ctx.response.status = 400;
    ctx.response.body = "Recipe could not be created because a user can not have multiple recipes with the same name!";
    return;
  }

  if (!passes) {
    console.error(errors);
    ctx.response.status = 400; // Bad Request
    ctx.response.body = errors;
    return;
  } else {
    await recipeService.addRecipe(
      ctx.state.user.id,
      recipeData.title,
      recipeData.description
    );

    const recipe = await recipeService.findRecipeByUserIdAndTitle(ctx.state.user.id, recipeData.title);

    if (recipe === -1) {
      console.error("Could not create recipe. Please try again.");
      ctx.response.status = 400; // Bad Request
      ctx.response.body = "Could not create recipe. Please try again.";
      return;
    }

    recipeData.ingredients.forEach(async (name: any) => {
      await ingredientService.addIngredient(
        recipe.id,
        name
        )
    })

    ctx.response.status = 200; // OK
  }
};

const deleteRecipe = async (ctx: any) => {
  const rId = ctx.params.rId
  const recipe = await recipeService.findRecipeById(rId);

  if (recipe === -1 || recipe.id != rId) {
    console.error("Could not delete recipe. Please try again.");
    ctx.response.status = 400; // Bad Request
    ctx.response.body = "Could not delete recipe. Please try again.";
    return;
  }

  if (recipe.user_id != ctx.state.user.id) {
    console.error("Not authorised to delete recipe.");
    ctx.response.status = 401; // Bad Request
    ctx.response.body = "Not authorised to delete this recipe!";
    return;
  }

  await recipeService.deleteRecipe(rId);

  ctx.response.status = 200; // OK
};

const updateRecipe = async (ctx: any) => {
  const rId = ctx.params.rId;
  const recipeData = await getRecipeData(ctx);
  const [passes, errors] = await validasaur.validate(
    recipeData,
    recipeValidationRules,
  );
  
  const recipe = await recipeService.findRecipeById(rId);

  if (recipe === -1) {
    console.error("Update failed, Recipe not found!");
    ctx.response.status = 400;
    ctx.response.body = "Recipe could not be updated because it could not be found!";
    return;
  }

  const recipe_duplicate = await recipeService.findRecipeByUserIdAndTitle(ctx.state.user.id, recipeData.title);

  if (recipe_duplicate !== -1) {
    console.error("Unique key constraint violation!");
    ctx.response.status = 400;
    ctx.response.body = "Recipe could not be created because a user can not have multiple recipes with the same name!";
    return;
  }

  if (recipe.user_id != ctx.state.user.id) {
    console.error("Not authorised to delete recipe.");
    ctx.response.status = 401; // Bad Request
    ctx.response.body = "Not authorised to delete this recipe!";
    return;
  }

  if (!passes) {
    console.error(errors);
    ctx.response.status = 400; // Bad Request
    ctx.response.body = errors;
    return;
  } else {
    await recipeService.updateRecipeById(
      recipe.id,
      recipeData.title,
      recipeData.description
    );

    await ingredientService.deleteIngredientsOfRecipeById(recipe.id);

    recipeData.ingredients.forEach(async (name: string) => {
      await ingredientService.addIngredient(
        recipe.id,
        name
        )
    })

    ctx.response.status = 200; // OK
  }
};


export { viewRecipe, addRecipe, searchRecipe, deleteRecipe, updateRecipe };
