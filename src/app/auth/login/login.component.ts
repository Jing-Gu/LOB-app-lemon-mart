import { registerLocaleData } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { AuthService } from '../auth.service'
import { Role } from '../role.enum'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  isLoading = false
  error = null
  redirectUrl

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { 
    //route.paramMap.subscribe(params => this.redirectUrl = params.get('redirectUrl'))
  }

  ngOnInit() { }

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(50)
    ]]
  })

  onSubmit(){
    this.isLoading = true
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password)
    .subscribe(
      resData => {
        console.log(resData)
        this.isLoading = false
        this.router.navigate(['/manager'])
      },
      errorMsg => {
        console.log(errorMsg)
        this.error = errorMsg
        this.isLoading = false
      }
    )
  }

  

  /* async login(submittedForm: FormGroup) { 
    this.authService
    .login(submittedForm.value.email, submittedForm.value.password)
    .subscribe(authStatus => {
      if (authStatus.isAuthenticated) {
      this.router.navigate([this.redirectUrl || '/manager']) }
    }, error => (this.loginError = error)) } */

}
