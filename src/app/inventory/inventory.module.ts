import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { MaterialModule } from '../material.module'

import { InventoryRoutingModule } from './inventory-routing.module'
import { InventoryComponent } from './inventory.component'
import { InventoryDashboardComponent } from './inventory-dashboard/inventory-dashboard.component'
import { StockEntryComponent } from './stock-entry/stock-entry.component'
import { ProductsComponent } from './products/products.component'
import { CategoriesComponent } from './categories/categories.component'
import { ProductListComponent } from './products/product-list/product-list.component'
import { ProductDetailComponent } from './products/product-detail/product-detail.component'
import { ProductItemComponent } from './products/product-list/product-item/product-item.component'
import { StockEditComponent } from './stock-entry/stock-edit/stock-edit.component'


@NgModule({
  declarations: [InventoryComponent, InventoryDashboardComponent, StockEntryComponent, ProductsComponent, CategoriesComponent, ProductListComponent, ProductDetailComponent, ProductItemComponent, StockEditComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    InventoryRoutingModule
  ]
})
export class InventoryModule { }
