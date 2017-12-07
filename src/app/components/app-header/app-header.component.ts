import { Component } from '@angular/core';
import { AuthService } from '../../_access/auth.service';
import { UserService } from 'app/services';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { User } from 'app/models';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html'
})
export class AppHeaderComponent implements OnInit {
  notifyCount: any;
  user: User;

  constructor(private as: AuthService, private us: UserService) {}

  ngOnInit()  {
    this.user = this.us.getCurrentUser();
  }

  logout () {
    return this.as.logout();
  }
}
