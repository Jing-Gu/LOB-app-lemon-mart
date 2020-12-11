import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { AuthService } from '../auth.service'
import { Role } from '../role.enum'
import { EmailValidation, PasswordValidation } from '../../common/validations'
import { UiService } from '../../common/ui.service'
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
    private route: ActivatedRoute,
    private uiService: UiService
  ) { }

  signupForm = this.fb.group({
    email: ['', EmailValidation],
    password: ['', PasswordValidation]
  })


  ngOnInit(): void {
  }

  onSwitch(){
    this.router.navigate(['/login'])
  }

  onSubmit() {
    this.isLoading = true
    if(this.signupForm.valid) {
      this.authService.signup(this.signupForm.value.email, this.signupForm.value.password)
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
        this.authService.user.subscribe(
          res => {
            console.log(res)
            this.uiService.showToast('First time? Welcome!' + ' ' + res.role)
          }
        )
    }
  }

}
