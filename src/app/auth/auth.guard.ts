import { Injectable } from '@angular/core'
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router'
import { Observable } from 'rxjs'
import { take, map } from 'rxjs/operators'
import { AuthService } from './auth.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.user.pipe(
      take(1),
      map(user => {
        const isAuth = !!user
        if(isAuth){
          return true
        }
        return this.router.createUrlTree(['/login'])
      })
    )
  }

}

//this.authService.user returns an Observable(subject) but not an Observable(boolean) accepted by canActivate
//use pipe(map) to transform the observable value
// !! returns any object not null to true, return null or undefined to false
// if ture, return true, grand access
// if false, return url tree to redirect

// use take(), because we don't want the guard to keep listening the user observable,
// take(1) means take the latest user value and unsubscribe, to avoid ongoing user subscription
