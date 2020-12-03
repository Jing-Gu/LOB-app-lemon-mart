import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { HomeComponent } from './home/home.component'
import { LoginComponent } from './auth/login/login.component'
import { NotFoundComponent } from './shared/not-found/not-found.component'
import { AuthGuard } from './auth/auth.guard'

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  
  { path: 'login', component: LoginComponent },
  { path: 'login/:redirectUrl', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'manager',
    loadChildren: () => import('./manager/manager.module').then(m => m.ManagerModule),
    canActivate: [ AuthGuard ]
  },
  { path: 'user',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  },
  { path: 'pos',
    loadChildren: () => import('./pos/pos.module').then(m => m.PosModule)
  },
  { path: 'inventory',
    loadChildren: () => import('./inventory/inventory.module').then(m => m.InventoryModule)
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
