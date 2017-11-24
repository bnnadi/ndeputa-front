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

  private endpoint = 'login.json';

  constructor(private http: HttpService) {}
//Todo: look into this 
  login(body: Object): Observable<User> {
    return this.http.post(this.endpoint, body)
      .map((res:Response) => {
        let response = res.json();
        if(response.user) {
          this.isLoggedIn = true;
          localStorage.setItem('user', response.user);
        }
      })
      .catch((error:any) => Observable.throw(error.json()))
  }

  logout():void {
    
    this.http.get('logout')
        .map((res:Response) => {
          this.isLoggedIn = false;
          localStorage.removeItem('user');
        })
        .catch((error:any) => Observable.throw(error.json()));
  }

  reset():Observable<boolean> {
    return Observable.of(true).delay(1000).do(val => this.isLoggedIn = true);
  }

}
