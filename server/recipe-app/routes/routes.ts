import { Router } from "../deps.ts";
import * as recipeController from "./controllers/recipeController.ts"

const router = new Router();

router.get("/recipes/:rId", recipeController.viewRecipe);

export { router };
