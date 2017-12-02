import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { HttpService } from '../core/http.service';
import { CUSTOMER } from '../fake/mock-customer';
import { Customer } from 'app/models/customer.model';


@Injectable()
export class CustomerService {
    private endpoint = 'customers.json';

    constructor(private http: HttpService) {}

    getCustomers(): Observable<any> {
        return of (CUSTOMER);
    }

    getCustomer(id: number): Observable<Customer> {
        return of(CUSTOMER.find(customer => customer.id === id));
    }

    addCustomer(body: Object): Observable<Customer> {
        const bodyString = JSON.stringify(body);

        return this.http.post(this.endpoint, body)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error));
    }

    updateCustomer(body: Object): Observable<Customer> {
        const bodyString = JSON.stringify(body);

        return this.http.put(this.endpoint, body)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error));
    }

    removeCustomer(id: string): Observable<Customer> {
        return this.http.delete(`${this.endpoint}/${id}.json`)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error));
    }


}
