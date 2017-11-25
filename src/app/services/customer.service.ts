import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { of } from 'rxjs/observable/of';

import { HttpService } from '../core/http.service';
import { CUSTOMER } from '../fake/mock-customer';
import { Customer } from 'app/models/customer.model';


@Injectable()
export class CustomerService {
    private endpoint = 'customers.json';
    
    constructor(private http: HttpService) {}

    getCustomers() : Observable<any> {
        return of (CUSTOMER);
    }

    getCustomer(id: number) : Observable<Customer> {
        return of(CUSTOMER.find(customer => customer.id === id));
    }

    addCustomer(body : Object): Observable<Customer[]> {
        let bodyString = JSON.stringify(body);

        return this.http.post(this.endpoint, body)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error));
    }


}