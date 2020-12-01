import { Component, OnDestroy, OnInit } from '@angular/core'
import { MatIconRegistry } from '@angular/material/icon'
import { DomSanitizer } from '@angular/platform-browser'
import { Subscription } from 'rxjs'
import { AuthService } from './auth/auth.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit, OnDestroy{

  isAuthenticated = false
  private userSub: Subscription

  constructor(
    iconRegistry: MatIconRegistry, 
    sanitizer: DomSanitizer,
    private authService: AuthService
    ){
    iconRegistry.addSvgIcon('lemon', sanitizer.bypassSecurityTrustResourceUrl('assets/images/lemon.svg'))
  }

  ngOnInit(){
    this.userSub = this.authService.user.subscribe( user => {
      this.isAuthenticated = !user ? false : true
    })

    this.authService.autoLogin()
  }

  onLogout(){
    this.authService.logout()
  }

  ngOnDestroy() {
    this.userSub.unsubscribe()
  }
}
