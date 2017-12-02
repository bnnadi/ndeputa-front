import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/_access/auth.service';

@Component({
  templateUrl: 'forgot-password.component.html'
})
export class ForgotPasswordComponent {

    constructor(public authService: AuthService, public router: Router) { }

    reset() {

    }
}
