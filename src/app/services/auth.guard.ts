import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { from, Observable, pipe } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from './auth.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
      return  this.auth.isLoggedIn().pipe(
        take(1),
        map((isLoggedIn: boolean) => {
          if (!isLoggedIn) {
                  this.router.navigate(['/login']);
                  return false;
                }
                return true;
        })
      );
  }
  
}
