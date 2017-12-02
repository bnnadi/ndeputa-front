import { Component, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/_access/auth.service';
import { UserService } from 'app/services';

@Component({
  templateUrl: 'login.component.html'
})
export class LoginComponent {

  constructor(public authService: AuthService, private us: UserService, public router: Router) { }

  login(form: any) {

    this.authService.login(form).subscribe(() => {
      if (this.us.isAuthenticated()) {
        const redirectUrl = this.authService.redirectUrl ? this.authService.redirectUrl : '/dashboard';
        this.router.navigate([redirectUrl]);
      }
    });
  }

  logout() {
    this.authService.logout();
  }

}
