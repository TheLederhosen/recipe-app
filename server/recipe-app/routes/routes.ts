import { Router } from "../deps.ts";
import * as recipeController from "./controllers/recipeController.ts";
import * as registrationController from "./controllers/registrationController.ts";
import * as loginController from "./controllers/loginController.ts";
import { authourised } from "../middlewares/isAuthorised.ts";

const router = new Router();

router.post("/auth/register", registrationController.registerUser);
router.post("/auth/login", loginController.loginUser);

router.get("/recipes", recipeController.searchRecipe);
router.get("/recipes/:rId", recipeController.viewRecipe);
router.delete("/recipes/:rId", recipeController.deleteRecipe);
router.post("/recipes", recipeController.addRecipe);
router.post("/recipes/:rId", recipeController.updateRecipe);

export { router };
