import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { map, tap } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";


@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) {

  };

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put(
        'https://ng-recipe-book-b2641-default-rtdb.firebaseio.com/recipes.json',
        recipes
      )
      .subscribe(response => {
        console.log(response);
      });
  }

  // async fetchRecipes() {
  //   const fetched = await fetch('https://ng-recipe-book-b2641-default-rtdb.firebaseio.com/recipes.json')
  //   console.log(fetched);
  // }


  fetchRecipes() {
    return this.http
      .get<Recipe[]>(
        'https://ng-recipe-book-b2641-default-rtdb.firebaseio.com/recipes.json'
      )
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            console.log(recipe)
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          });
        }),
        tap( recipes =>{
          this.recipeService.setRecipes(recipes);
        }
         
        )
      )
      
      

  }

  // fetchRecipes() {
  //   return this.http
  //     .get<Recipe[]>(
  //       'https://ng-recipe-book-b2641-default-rtdb.firebaseio.com/recipes.json'
  //     ).subscribe(recipes=>{
  //       this.recipeService.setRecipes(recipes);
        
  //     })
  // }
}
