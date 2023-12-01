import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable, catchError, of, throwError } from "rxjs";
import { CreateRecipeDto, RecipeDto } from "../global/recipe-dto";
import { Globals } from "../global/globals"


@Injectable()
export class RecipeService {
  private recipesBaseUri: string = this.globals.backendUri + "recipes";

  constructor(private http: HttpClient, private globals: Globals) { }

  getRecipebyId(id: number): Observable<RecipeDto> {
    return this.http.get<RecipeDto>(`${this.recipesBaseUri}/${id}`);
  }

  postRecipe(title: string, description: string, ingredients: string[]) {
    const recipe = {
      title,
      description,
      ingredients
    } as CreateRecipeDto

    console.log(recipe)
    return this.http.post<CreateRecipeDto>(`${this.recipesBaseUri}`, recipe);
  }

  searchRecipe(seachTerm: string): Observable<RecipeDto[]> {
    const params = new HttpParams()
      .set('searchTerm', seachTerm)

    return this.http.get<RecipeDto[]>(`${this.recipesBaseUri}`, {params});
  }

  deleteRecipeById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.recipesBaseUri}/${id}`)
  }
}
