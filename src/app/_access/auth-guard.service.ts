import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from 'app/services';
import { AuthService } from 'app/_access/auth.service';


@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private us: UserService, public authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;

    return this.checkLogin(url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  checkLogin(url: string): boolean {
    if (!this.us.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }
    this.authService.redirectUrl = url;
    return true;
  }

}
