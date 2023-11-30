import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-search-recipe',
  templateUrl: './search-recipe.component.html',
  styleUrls: ['./search-recipe.component.scss']
})
export class SearchRecipeComponent implements AfterViewInit {

  private titleSubject = new Subject<string>();

  readonly recipes$ = this.titleSubject.pipe(
    debounceTime(50),
    distinctUntilChanged(),
    switchMap(searchTerm => this.recipeService.searchRecipe(searchTerm))
  );


  constructor(private router:Router, private recipeService: RecipeService) {

  }

  ngAfterViewInit() {
    this.titleSubject.next("");
  }

  searchRecipes(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value;
    this.titleSubject.next(searchTerm || "");
  }

  cardEventHandler(id: number) {
    this.router.navigate(['/view/' + id]);
  }
}
