import { IngredientsDto } from "./ingredients-dto";

export interface RecipeDto {
    id: number
    userId: number;
    userName: string;
    title: string;
    description: string;
    ingredients: IngredientsDto[];
}

export interface CreateRecipeDto {
    userId: number;
    title: string;
    description: string;
    ingredients: string[];
}