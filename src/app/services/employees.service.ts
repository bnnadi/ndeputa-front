import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { HttpService } from '../core/http.service';
import { of } from 'rxjs/observable/of';

import { User } from '../models';
import { EMPLOYEES } from '../fake/mock-employee';

@Injectable()
export class EmployeesService {

    private endpoint = 'employees.json'

    constructor(http: HttpService) {}

    getEmployees() : Observable<any> {
        return of (EMPLOYEES);
    }

    getEmployee(id: number) : Observable<User> {
        return of(EMPLOYEES.find(employee => employee.id === id));
    }


    addEmployee(body : Object): Observable<User> {
        let bodyString = JSON.stringify(body);

        return this.http.post(this.endpoint, body)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error));
    }

    updateEmployee(body : Object): Observable<User> {
        let bodyString = JSON.stringify(body);
        
        return this.http.put(this.endpoint, body)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error));
    }

    removeEmployee(id:string): Observable<User> {
        return this.http.delete(`${this.endpoint}/${id}.json`)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error));
    }
}