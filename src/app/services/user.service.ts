import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { HttpService } from '../core/http.service';
import { JwtService } from './jwt.service';


import { User } from '../models';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { JwtHelper } from '../core/jwt-helper.service';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserService {
  private endpointUser = 'user.json';
  private currentUserSubject = new BehaviorSubject<User>(new User());
  private currentUser = this.currentUserSubject.asObservable().distinctUntilChanged();

  constructor(private http: HttpService, private jwt: JwtService, public router: Router, public jwtHelper: JwtHelper) {}

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
    this.router.navigate(['/login']);
  }

  authenticate() {
    return this.http.get('user/authenticate.json', {})
      .map((res: Response) => {
        const response = res.json()
        this.setAuth(response.user);
      })
      .catch((error: any) => Observable.throw(error));
  }

  isAuthenticated() {
    const token = this.jwt.getToken();
    if (token === null || token === 'undefined') { return false; }
    return !this.jwtHelper.isTokenExpired(token)
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

  getAccess(): string {
    return this.currentUserSubject.value.access;
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
