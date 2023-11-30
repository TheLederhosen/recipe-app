import { IngredientsDto } from "./ingredients-dto.ts";

export interface RecipeDto {
    id: number
    userId: number;
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