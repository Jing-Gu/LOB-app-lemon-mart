import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'
import { Ingredient } from '../../shared/ingredient.model'

@Injectable({
  providedIn: 'root'
})
export class StockEntryService {

  ingredientChanged = new Subject<Ingredient[]>()

  private ingredients: Ingredient[] = [
    new Ingredient('Lemon', 5),
    new Ingredient('apple', 2)
  ]

  getIngredients(){
    return this.ingredients.slice()
  }

  addIngredient(ingredient: Ingredient){
    this.ingredients.push(ingredient)
    this.ingredientChanged.next(this.ingredients.slice())
  }

  addToStock(ingredients: Ingredient[]){
    this.ingredients.push(...ingredients)
    this.ingredientChanged.next(this.ingredients.slice())
  }

}