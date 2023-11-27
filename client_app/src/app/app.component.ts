import { Component } from '@angular/core';
import { RecipeService } from './services/recipe.service';
import { RecipeDto } from '../../../server/recipe-app/global/recipe-dto'
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'test_angular_deno_stack';

  recipe: RecipeDto;

  constructor(public router: Router,
    private recipeService: RecipeService) { 
    this.recipe = {
      userId: 0,
      title: "",
      description: ""
    }
  }
  ngOnInit() {
    this.recipeService.getRecipe().subscribe((result: any) => {
      this.recipe = result;
    });
  }
}
