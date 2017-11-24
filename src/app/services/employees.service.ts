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

    getEmployees() : Observable<User[]> {
        return of (EMPLOYEES);
    }

    getEmployee(id: number) : Observable<User> {
        return of(EMPLOYEES.find(employee => employee.id === id));
    }
}