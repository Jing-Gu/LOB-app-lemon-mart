import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MaterialModule } from '../material.module'
import { ReactiveFormsModule } from '@angular/forms'
import { AuthRoutingModule } from './auth-routing.module'
import { LoginComponent } from './login/login.component'
import { SignupComponent } from './signup/signup.component'
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component'

@NgModule({
  declarations: [ LoginComponent, SignupComponent, LoadingSpinnerComponent ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }