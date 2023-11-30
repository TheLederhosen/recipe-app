import { AfterContentInit, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { RecipeService } from './services/recipe.service';
import { RecipeDto } from './global/recipe-dto'
import { Router } from '@angular/router';
import { CreateRecipeComponent } from './components/create-recipe/create-recipe.component';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'test_angular_deno_stack';

  constructor(public router: Router) {
  }
}
