import { Component, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  
  constructor(public authService: AuthService, public router: Router) { }

  login(form: any) {

    this.authService.login(form).subscribe(() => {

      if(this.authService.isLoggedIn) {
        let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/dashboard';

        this.router.navigate([redirect]);
      }
    });
  }

  logout() {
    this.authService.logout();
  }

}