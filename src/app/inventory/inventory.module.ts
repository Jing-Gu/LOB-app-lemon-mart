import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module'

import { InventoryRoutingModule } from './inventory-routing.module';
import { InventoryComponent } from './inventory.component';
import { InventoryDashboardComponent } from './inventory-dashboard/inventory-dashboard.component';
import { StockEntryComponent } from './stock-entry/stock-entry.component';
import { ProductsComponent } from './products/products.component';
import { CategoriesComponent } from './categories/categories.component';


@NgModule({
  declarations: [InventoryComponent, InventoryDashboardComponent, StockEntryComponent, ProductsComponent, CategoriesComponent],
  imports: [
    CommonModule,
    MaterialModule,
    InventoryRoutingModule
  ]
})
export class InventoryModule { }
