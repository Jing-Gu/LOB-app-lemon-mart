import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model'
import { StockEntryService } from './stock-entry.service'
@Component({
  selector: 'app-stock-entry',
  templateUrl: './stock-entry.component.html',
  styleUrls: ['./stock-entry.component.sass']
})
export class StockEntryComponent implements OnInit {

  ingredients: Ingredient[]

  constructor(private stockEntryService: StockEntryService) { }

  ngOnInit(){
    this.ingredients = this.stockEntryService.getIngredients()
    this.stockEntryService.ingredientChanged.subscribe(
      res => {
        //console.log(res)
        this.ingredients = res
      }
    )
  }

  onEditItem(index: number){
    this.stockEntryService.startedEditing.next(index)
  }

}
