import { Router } from "../deps.ts";
import * as recipeController from "./controllers/recipeController.ts"

const router = new Router();

router.get("/recipes", recipeController.searchRecipe);
router.get("/recipes/:rId", recipeController.viewRecipe);
router.post("/recipes", recipeController.addRecipe);

export { router };
