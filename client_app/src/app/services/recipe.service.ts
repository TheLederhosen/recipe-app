import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { RecipeDto } from "../../../../server/recipe-app/global/recipe-dto";
import { Globals } from "../global/globals"


@Injectable()
export class RecipeService {
  private recipesBaseUri: string = this.globals.backendUri + "recipes";

  constructor(private http: HttpClient, private globals: Globals) {}

  getRecipe(): Observable<RecipeDto> {
    return this.http.get<RecipeDto>(this.recipesBaseUri + "/1");
  }
}
