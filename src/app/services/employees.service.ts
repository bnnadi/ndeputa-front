import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { HttpService } from 'app/core/http.service';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Employee } from '../models';
import { EMPLOYEES } from 'app/fake/mock-employee';

@Injectable()
export class EmployeesService {

    private endpoint = 'employees.json'

    constructor(private http: HttpService) {}

    getEmployees(): Observable<any> {
        return of (EMPLOYEES);
    }

    getEmployee(id: number): Observable<Employee> {
        return of(EMPLOYEES.find(employee => employee.id === id));
    }


    addEmployee(body: Object): Observable<Employee> {
      const bodyString = JSON.stringify(body);

        return this.http.post(this.endpoint, body)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error));
    }

    updateEmployee(body: Object): Observable<Employee> {
        const bodyString = JSON.stringify(body);

        return this.http.put(this.endpoint, body)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error));
    }

    removeEmployee(id: string): Observable<Employee> {
        return this.http.delete(`${this.endpoint}/${id}.json`)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error));
    }
}
