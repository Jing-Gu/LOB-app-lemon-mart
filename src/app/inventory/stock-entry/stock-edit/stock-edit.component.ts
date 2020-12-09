import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Subscription } from 'rxjs'
import { Ingredient } from '../../../shared/ingredient.model'
import { StockEntryService } from '../stock-entry.service'

@Component({
  selector: 'app-stock-edit',
  templateUrl: './stock-edit.component.html',
  styleUrls: ['./stock-edit.component.sass']
})
export class StockEditComponent implements OnInit, OnDestroy {

  stockForm: FormGroup

  editSub: Subscription
  editMode = false
  editItemIndex: number
  editItem: Ingredient

  constructor(private stockEntryService: StockEntryService) { }

  ngOnInit(){
    this.stockForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      amount: new FormControl(null, [Validators.required, Validators.min(1)])
    })

    this.editSub = this.stockEntryService.startedEditing.subscribe(
      (index: number) => {
          this.editMode = true
          this.editItemIndex = index
          this.editItem = this.stockEntryService.getIngredient(index)
          //console.log(this.editItem)
          this.stockForm.get('name').setValue(this.editItem.name)
          this.stockForm.get('amount').setValue(this.editItem.amount)
      }
    )
  }

  onSubmit(stockForm: FormGroup){
    const newIngredient = new Ingredient(this.stockForm.value.name, this.stockForm.value.amount)
    // if the item already exists, update the number, not adding a new
    if(this.editMode){
      this.stockEntryService.updateIngredient(this.editItemIndex, newIngredient)
    } else {
      this.stockEntryService.addIngredient(newIngredient)
    }
    this.editMode = false
    this.stockForm.reset()
  }

  onDelete(){
    this.onClear()
    this.stockEntryService.deleteIngredient(this.editItemIndex)
  }

  onClear(){
    this.editMode = false
    this.stockForm.reset()
  }

  ngOnDestroy(){
    this.editSub.unsubscribe()
  }


}
