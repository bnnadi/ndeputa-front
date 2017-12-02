import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: `<app-loader></app-loader>
  <router-outlet></router-outlet>`
})
export class AppComponent implements OnInit {
  constructor(private us: UserService) {}

  ngOnInit() {
    this.us.populate();
  }
}
