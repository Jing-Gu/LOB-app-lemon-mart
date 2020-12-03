import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { MaterialModule } from './material.module'

import { AuthService } from './auth/auth.service'

import { AuthModule } from './auth/auth.module'
import { ManagerModule } from './manager/manager.module'
import { InventoryModule } from './inventory/inventory.module'
import { PosModule } from './pos/pos.module'
import { UserModule } from './user/user.module'

import { HomeComponent } from './home/home.component'
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { SimpleDialogComponent } from './common/simple-dialog/simple-dialog.component';
import { NavigationMenuComponent } from './navigation-menu/navigation-menu.component'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    SimpleDialogComponent,
    NavigationMenuComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AuthModule,
    MaterialModule,
    ManagerModule,
    InventoryModule,
    PosModule,
    UserModule,
    AppRoutingModule,
  ],
  providers: [ AuthService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
