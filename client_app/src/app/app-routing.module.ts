import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { OverviewComponent } from "./components/overview/overview.component";
import { ViewRecipeComponent } from "./components/view-recipe/view-recipe.component";
import { CreateRecipeComponent } from "./components/create-recipe/create-recipe.component";
import { SearchRecipeComponent } from "./components/search-recipe/search-recipe.component";
import { EditRecipeComponent } from "./components/edit-recipe/edit-recipe.component";
import { RegistrationComponent } from "./components/registration/registration.component";
import { LoginComponent } from "./components/login/login.component";

const routes: Routes = [
  { path: "", component: OverviewComponent },
  { path: "view/:id", component: ViewRecipeComponent },
  { path: "edit/:id", component: EditRecipeComponent },
  { path: "create", component: CreateRecipeComponent },
  { path: "search", component: SearchRecipeComponent },
  { path: "register", component: RegistrationComponent },
  { path: "login", component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
