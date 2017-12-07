import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { HttpService } from 'app/core/http.service';
import { User } from 'app/models';
import { UserService } from 'app/services';

@Injectable()
export class AuthService {

  isLoggedIn = false;
  redirectUrl: string;

  constructor(private http: HttpService, private us: UserService) {}

  login(body: Object): Observable<User> {
    return this.http.post('login.json', body, {})
      .map((res: Response) => {
        const response = res.json();
        this.us.setAuth(response.result);
      })
      .catch((error: any) => Observable.throw(error.json()))
  }

  logout(): void {
    console.log('Logging out...');
    // TODO look into why this isn't firing
    this.http.get('logout')
        .map((res: Response) => {
          console.log('logged out');
          this.us.purgeAuth();
        })
        .catch((error: any) => Observable.throw(error.json()));
  }

}
