import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { CategoriesComponent } from './categories/categories.component'
import { InventoryDashboardComponent } from './inventory-dashboard/inventory-dashboard.component'
import { InventoryComponent } from './inventory.component'
import { ProductDetailComponent } from './products/product-detail/product-detail.component'
import { ProductEditComponent } from './products/product-edit/product-edit.component'
import { ProductStartComponent } from './products/product-start/product-start.component'
import { ProductsComponent } from './products/products.component'
import { StockEntryComponent } from './stock-entry/stock-entry.component'

const routes: Routes = [
  {path: 'inventory', component: InventoryComponent, children: [
    { path: '', redirectTo: '/inventory/home', pathMatch: 'full' },
    { path: 'home', component: InventoryDashboardComponent },
    { path: 'stock', component: StockEntryComponent },
    { path: 'products', component: ProductsComponent, children: [
      { path:'', component: ProductStartComponent },
      { path: 'new', component: ProductEditComponent },
      { path: ':id', component: ProductDetailComponent },
      { path: ':id/edit', component: ProductEditComponent }
    ]},
    { path: 'categories', component: CategoriesComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
