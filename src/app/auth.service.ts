import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { HttpService } from 'app/core/http.service';
import { User } from 'app/models';

@Injectable()
export class AuthService {

  isLoggedIn = false;
  redirectUrl: string;

  constructor(private http: HttpService) {}

  login(body: Object): Observable<User> {
    return this.http.post('login.json', body)
      .map((res:Response) => {
        let response = res.json();
        localStorage.setItem('user', JSON.stringify(response.result.user));
        localStorage.setItem('token', response.result.token);
      })
      .catch((error:any) => Observable.throw(error.json()))
  }

  logout():void {
    
    this.http.get('logout')
        .map((res:Response) => {
          localStorage.removeItem('user');
          localStorage.removeItem('token');
        })
        .catch((error:any) => Observable.throw(error.json()));
  }

  isAuthenticated() {
    let token = localStorage.getItem('token');
    return (token) ? true : false;
  }

}
