import { Component } from '@angular/core';
import { AuthService } from '../../_access/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html'
})
export class AppHeaderComponent {
  notifyCount: any;

  constructor(private as: AuthService) {}

  logout () {
    return this.as.logout();
  }
}
