import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe.service';
import { ActivatedRoute } from '@angular/router';
import { RecipeDto } from '../../global/recipe-dto';

@Component({
  selector: 'app-view-recipe',
  templateUrl: './view-recipe.component.html',
  styleUrls: ['./view-recipe.component.scss'],
})
export class ViewRecipeComponent implements OnInit {

  recipe: RecipeDto = {
    userId: 0,
    title: "",
    description: "",
    ingredients: []
  };

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params) => this.recipeService.getRecipe(params["id"])
        .subscribe((recipe) => {
          this.recipe = recipe;
        }))
  }

  ingredients: string[] = ["300g Mehl", "Nudeln", "Other things", "Thing", "Looooooooooooooooooong thing"];
}