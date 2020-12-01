import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'

//import { sign } from 'fake-jwt-sign' // For fakeAuthProvider only 
//import * as decode from 'jwt-decode'
//import jwt_decode, { JwtPayload } from 'jwt-decode'

import { BehaviorSubject, Observable, of, Subject, throwError as observableThrowError, throwError } from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators'
import { environment } from '../../environments/environment'
import { Role } from './role.enum'

import { transformError } from '../common/common'
import { User } from './user.model'
import { UiService } from '../common/ui.service'
import { Router } from '@angular/router'

// the format of firebase response payload
interface IServerAuthResponse {
  kind: string
  idToken: string
  email: string
  refreshToken: string
  expiresIn: string
  localId: string
  registered?: boolean
}

/* export interface IAuthStatus {
  isAuthenticated: boolean
  userRole: Role
  userId: string 
} */

/* const defaultAuthStatus = {
  isAuthenticated: false,
  userRole: Role.None,
  userId: null
} */


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new Subject<User>()

  apiKey = 'AIzaSyDUB__wWBluZOKCnyxgJyunfhWU_B7QT3A'


  //authStatus = new BehaviorSubject<IAuthStatus>(defaultAuthStatus)


  constructor(
    private http: HttpClient,
    private router: Router, 
    private uiService: UiService) {
    // Fake login function to simulate roles 
    //this.authProvider = this.fakeAuthProvider
    // Example of a real login call to server-side
    // this.authProvider = this.exampleAuthProvider
   }



   signup(email: string, passward: string){
      return this.http.post<IServerAuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`,
        {
          email: email,
          password: passward,
          returnSecureToken: true
        }
      ).pipe(catchError(this.handleError), tap( resData => {
        this.handleAuthentication(
          resData.email,
          resData.localId,
          resData.idToken,
          +resData.expiresIn
        )
      }))
   }

   login(email: string, passward: string){
     return this.http.post<IServerAuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`,
        {
          email: email,
          password: passward,
          returnSecureToken: true
        }
     ).pipe(catchError(this.handleError), tap( resData => {
      this.handleAuthentication(
        resData.email,
        resData.localId,
        resData.idToken,
        +resData.expiresIn
      )
    }))
   }

   // auto sets the user to login when the app starts, by checking if there's exisitng user snapshot stored
   autoLogin(){
    const userData = JSON.parse(localStorage.getItem('userData'))
    if(!userData){
      return
    }

    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate))
    if(loadedUser.token){
      this.user.next(loadedUser)
    }
   }

   logout(){
     this.user.next(null)
     this.router.navigate(['/login'])
   }

   private handleError(errorRes: HttpErrorResponse){
      let errorMsg = "An unknown error occurred!"
      if(!errorRes.error || !errorRes.error.error) {
        return throwError(errorMsg)
      }
      switch(errorRes.error.error.message) {
        case 'EMAIL_EXISTS':
          errorMsg = 'The email address is already in use by another account.'
          break
        case 'EMAIL_NOT_FOUND':
          errorMsg = 'Email is not existed. There is no user record corresponding to this identifier.'
          break
        case 'INVALID_PASSWORD':
          errorMsg = 'The password is invalid or the user does not have a password.'
          break
      }
      return throwError(errorMsg)
   }


   private handleAuthentication(
     email: string,
     userId: string,
     token: string,
     expiresIn: number,
   ){
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000)
    const user = new User(email, userId, token, expirationDate)
    this.user.next(user)
    localStorage.setItem('userData', JSON.stringify(user))
   }

   defineUserAuthStatus(email: string, message: string){
     
      const isAuthenticated = true
      const userRole = email.toLowerCase().includes('cashier') ? Role.Cashier
      : email.toLowerCase().includes('clerk') ? Role.Clerk
      : email.toLowerCase().includes('manager') ? Role.Manager 
      : Role.None
      //console.log(userRole)
    
      this.uiService.showToast(message + ' ' + userRole)
   }


}
