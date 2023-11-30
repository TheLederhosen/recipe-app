import * as recipeService from "../../services/recipeService.ts";
import * as ingredientService from "../../services/ingredientService.ts";
import { RecipeDto } from "../../global/recipe-dto.ts";
import { validasaur } from "../../deps.ts";
import { Context, RouterContext } from "https://deno.land/x/oak@v11.1.0/mod.ts";

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
    ingredients: jsonBody.ingredients
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

  ingredients.forEach((element: any) => {
    delete element.id;
  });

  if (recipe === -1) {
    ctx.response.redirect("/recipes");
    return;
  }

  const recipeDto: RecipeDto = {
    id: -1,
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

  if (!passes) {
    console.log(errors);
    const validationErrors = errors;
    ctx.response.status = 400; // Bad Request
    // TODO: Validation
  } else {
    await recipeService.addRecipe(
      1,
      recipeData.title,
      recipeData.description
    );

    const recipe = await recipeService.findRecipeByUserIdAndTitle(1, recipeData.title);

    if (recipe === -1) {
      console.log(errors);
      const validationErrors = "Could not create recipe";
      ctx.response.status = 400; // Bad Request
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


export { viewRecipe, addRecipe, searchRecipe };
