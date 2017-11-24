import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { HttpService } from '../core/http.service';

import { User } from '../models';


@Injectable()
export class UserService {
    private endpoint = 'users.json';
    
    constructor(private http: HttpService) {}


}