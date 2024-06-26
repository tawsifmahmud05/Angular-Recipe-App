import { Subject } from "rxjs";

import { Ingredient } from "../shared/ingredent.model";

export class ShoppingListService{

    ingredientsChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();

    private ingredients: Ingredient[] = [
        new Ingredient('Apple', 50),
        new Ingredient('Mango', 100),
      ];

      getIndgredient(index: number){
        return this.ingredients[index];
      }


      getIndgredients(){
        return this.ingredients;
      }

      addIngredient(ingredient: Ingredient){
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice());
      }

      updateIngredient(index: number, newIngredient: Ingredient){
        this.ingredients[index] = newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice());
      }

      addIngredients(ingredients: Ingredient[]){
        // for(let ingredient of ingredients){
        //   this.addIngredient(ingredient);
        // }
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.ingredients.slice());

      }

      deleteIngredient(index: number)  {
        this.ingredients.splice(index, 1);
        this.ingredientsChanged.next(this.ingredients.slice());

      }
}