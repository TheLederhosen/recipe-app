import { Router } from "../deps.ts";
import * as recipeController from "./controllers/recipeController.ts"

const router = new Router();

router.get("/recipes", recipeController.searchRecipe);
router.get("/recipes/:rId", recipeController.viewRecipe);
router.delete("/recipes/:rId", recipeController.deleteRecipe);
router.post("/recipes", recipeController.addRecipe);
router.post("/recipes/:rId", recipeController.updateRecipe);

export { router };
