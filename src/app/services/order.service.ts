import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { HttpService } from '../core/http.service';

import { Customer } from '../models';


@Injectable()
export class OrderService {
    private endpoint = 'orders.json';
    
    constructor(private http: HttpService) {}


}