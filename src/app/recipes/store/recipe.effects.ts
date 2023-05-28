import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as RecipesActions from './recipe.actions';
import { map, switchMap } from 'rxjs/operators';
import { Recipe } from '../recipe.model';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class RecipeEffects {
  fetchRecipes = createEffect(() => this.actions.pipe(
    ofType(RecipesActions.FETCH_RECIPES),
    switchMap(() => {
      return this.http
        .get<Recipe[]>(
          environment.databaseURL + 'recipes.json'
        );
    }),
    map(recipes => {
      return recipes.map(recipe => {
        return {
          ...recipe,
          ingredients: recipe.ingredients ? recipe.ingredients : []
        };
      });
    }),
    map(recipes => {
      return new RecipesActions.SetRecipes(recipes);
    })
    )
  );

  constructor(
    private actions: Actions,
    private http: HttpClient
  ) {}
}
