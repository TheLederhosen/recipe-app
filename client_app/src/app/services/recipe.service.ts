import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable, catchError, of } from "rxjs";
import { CreateRecipeDto, RecipeDto } from "../global/recipe-dto";
import { Globals } from "../global/globals"


@Injectable()
export class RecipeService {
  private recipesBaseUri: string = this.globals.backendUri + "recipes";

  constructor(private http: HttpClient, private globals: Globals) { }

  getRecipebyId(id: number): Observable<RecipeDto> {
    return this.http.get<RecipeDto>(this.recipesBaseUri + "/" + id);
  }

  postRecipe(title: string, description: string, ingredients: string[]): void {
    const recipe = {
      title,
      description,
      ingredients
    } as CreateRecipeDto

    console.log(recipe)
    this.http.post<CreateRecipeDto>(this.recipesBaseUri, recipe).subscribe({
      next: data => {
        console.log(data)
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }

  searchRecipe(seachTerm: string): Observable<RecipeDto[]> {
    const params = new HttpParams()
      .set('searchTerm', seachTerm)

    return this.http.get<RecipeDto[]>(this.recipesBaseUri, {params}).pipe(
      catchError(err => of([]))
    );
  }
}
