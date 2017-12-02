import { Injectable } from '@angular/core';

@Injectable()
export class JwtService {

  getToken(): String {
    return localStorage.getItem('token');
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  destoryToken() {
    localStorage.removeItem('token');
  }
}
