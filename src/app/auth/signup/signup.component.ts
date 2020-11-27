import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { AuthService } from '../auth.service'
import { Role } from '../role.enum'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent implements OnInit {

  isLoading = false
  error = null

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  signupForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(50)
    ]]
  })
 

  ngOnInit(): void {
  }

  onSubmit() {
    this.isLoading = true
    if(this.signupForm.valid) {
      this.authService.signup(this.signupForm.value.email, this.signupForm.value.password)
        .subscribe(
          resData => {
            console.log(resData)
            this.isLoading = false
          },
          errorMsg => {
            console.log(errorMsg)
            this.error = errorMsg
            this.isLoading = false
          }
        )
    }
  }

}
