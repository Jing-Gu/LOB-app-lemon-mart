import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AuthGuard } from '../auth/auth.guard'
import { CategoriesComponent } from './categories/categories.component'
import { InventoryDashboardComponent } from './inventory-dashboard/inventory-dashboard.component'
import { InventoryComponent } from './inventory.component'
import { ProductDetailComponent } from './products/product-detail/product-detail.component'
import { ProductEditComponent } from './products/product-edit/product-edit.component'
import { ProductStartComponent } from './products/product-start/product-start.component'
import { ProductsResolverService } from './products/products-resolver.service'
import { ProductsComponent } from './products/products.component'
import { StockEntryComponent } from './stock-entry/stock-entry.component'

const routes: Routes = [
  {path: 'inventory', component: InventoryComponent, children: [
    { path: '', redirectTo: '/inventory/home', pathMatch: 'full' },
    { path: 'home', component: InventoryDashboardComponent, canActivate: [AuthGuard] },
    { path: 'stock', component: StockEntryComponent, canActivate: [AuthGuard] },
    { path: 'products', component: ProductsComponent, children: [
        { path:'', component: ProductStartComponent },
        { path: 'new', component: ProductEditComponent },
        { path: ':id', component: ProductDetailComponent, resolve: [ProductsResolverService] },
        { path: ':id/edit', component: ProductEditComponent, resolve: [ProductsResolverService] }
      ],
    canActivate: [AuthGuard]
    },
    { path: 'categories', component: CategoriesComponent, canActivate: [AuthGuard] }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
