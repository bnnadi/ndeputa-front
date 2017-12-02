import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { HttpService } from '../core/http.service';
import { JwtService } from './jwt.service';

import { User } from '../models';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class UserService {
  private endpointUser = 'user.json';
  private currentUserSubject = new BehaviorSubject<User>(new User());
  private currentUser = this.currentUserSubject.asObservable().distinctUntilChanged();

  constructor(private http: HttpService, private jwt: JwtService, public router: Router) {}

  populate() {
    if (this.jwt.getToken()) {
      this.authenticate();
      this.router.navigate(['/dashboard']);
    } else {
      this.purgeAuth();
    }
  }

  setAuth(user: User) {
    this.jwt.saveToken(user.token);
    this.currentUserSubject.next(user);
  }

  purgeAuth() {
    this.jwt.destoryToken();
    this.currentUserSubject.next(new User());
  }

  authenticate() {
    return this.http.get('user/authenticate.json', {})
      .map((res: Response) => {
        const response = res.json()
        this.setAuth(response.user);
      })
      .catch((error: any) => Observable.throw(error));
  }

  isTokenExpired(token: string) {
    if ('undefined' === token) {
      return true;
    }
    return false;
  }

  isAuthenticated() {
    const token = localStorage.getItem('token');
    return !this.isTokenExpired(token)
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

  // These methonds are for the user Profile
  getUser(): Observable<User> {
      return this.http.get(this.endpointUser)
          .map((res: Response) => res.json())
          .catch((error: any) => Observable.throw(error));
  }

  updateUser(body: Object): Observable<User> {
      const bodyString = JSON.stringify(body);

      return this.http.put(this.endpointUser, body)
          .map((res: Response) => res.json())
          .catch((error: any) => Observable.throw(error));
  }

  updateAddress(body: Object): Observable<User> {
      const bodyString = JSON.stringify(body);

      return this.http.put(this.endpointUser, body)
          .map((res: Response) => res.json())
          .catch((error: any) => Observable.throw(error));
  }

  updatePhone(body: Object): Observable<User> {
      const bodyString = JSON.stringify(body);

      return this.http.put(this.endpointUser, body)
          .map((res: Response) => res.json())
          .catch((error: any) => Observable.throw(error));
  }

}
