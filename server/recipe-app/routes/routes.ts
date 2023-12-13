import { Router } from "../deps.ts";
import * as recipeController from "./controllers/recipeController.ts";
import * as userController from "./controllers/userController.ts";
import * as loginController from "./controllers/loginController.ts";
import { authourised } from "../middlewares/isAuthorised.ts";

const router = new Router();

router.post("/auth/login", loginController.loginUser);

router.post("/users", userController.registerUser);
router.get("/users/:uId", userController.viewUser);

router.get("/recipes", recipeController.searchRecipe);
router.get("/recipes/:rId", recipeController.viewRecipe);
router.delete("/recipes/:rId", authourised, recipeController.deleteRecipe);
router.post("/recipes", authourised, recipeController.addRecipe);
router.post("/recipes/:rId", authourised, recipeController.updateRecipe);

export { router };
