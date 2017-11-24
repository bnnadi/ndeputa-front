import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { HttpService } from '../core/http.service';

import { Customer } from '../models';


@Injectable()
export class PasswordResetService {
    private endpoint = 'passwordReset.json';
    
    constructor(private http: HttpService) {}


}