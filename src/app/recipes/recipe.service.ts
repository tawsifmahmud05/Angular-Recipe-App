import {  Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";

import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredent.model";

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

    // private recipes: Recipe[] = [
    //     new Recipe(
    //       'A Test Recipe',
    //       'This is simply a test',
    //       'https://cdn.pixabay.com/photo/2023/05/31/11/15/fish-8031138_1280.jpg',
    //       [
    //         new Ingredient("Meat",1),
    //         new Ingredient("Potato",20)
    //       ]
    //     ),
    //     new Recipe(
    //       'Another Test Recipe',
    //       'This is simply a test',
    //       'https://cdn.pixabay.com/photo/2023/05/31/11/15/fish-8031138_1280.jpg',
    //       [
    //         new Ingredient("Buns",12),
    //         new Ingredient("Potato",20)
    //       ]
    //     ),
    //   ];

    private recipes:Recipe[] = [];

      constructor(private slService: ShoppingListService){}

      setRecipes(recipes:Recipe[]){
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());

      }

      getRecipes(){
        return this.recipes.slice();
      }
      getRecipe(index:number){
        return this.recipes[index];
      }

      addIngredientsToShoppingList(ingredients:Ingredient[]){
        this.slService.addIngredients(ingredients)
      }

      addRecipe(recipe:Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
      }

      updateRecipe(index:number,newRecipe:Recipe){
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());

      }

      deleteRecipe(index:number){
        this.recipes.splice(index,1);
        this.recipesChanged.next(this.recipes.slice());

      }
}