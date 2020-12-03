import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { Ingredient } from '../../../shared/ingredient.model'
import { StockEntryService } from '../stock-entry.service'

@Component({
  selector: 'app-stock-edit',
  templateUrl: './stock-edit.component.html',
  styleUrls: ['./stock-edit.component.sass']
})
export class StockEditComponent implements OnInit {

  @ViewChild('nameInput') nameInputRef: ElementRef
  @ViewChild('amountInput') amountInputRef: ElementRef

  constructor(private stockEntryServic: StockEntryService) { }

  ngOnInit(): void {  
  }

  onAddIngredient(){
      const ingName = this.nameInputRef.nativeElement.value
      const ingAmount = this.amountInputRef.nativeElement.value
      const newIngredient = new Ingredient(ingName, ingAmount)
      this.stockEntryServic.addIngredient(newIngredient)
  }

}
