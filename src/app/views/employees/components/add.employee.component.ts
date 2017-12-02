import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeesService, CompanyService } from 'app/services';
import { Employee, Company } from 'app/models';
import { user } from 'app/_user';

@Component({
  templateUrl: 'add.employee.component.html'
})
export class AddEmployeeComponent {

  employee: Employee;
  companies: any;
  titles: any;

  constructor(private es: EmployeesService, private cs: CompanyService) {
    this.getCompanies();
  }

  getCompanies() {
    this.cs.getCompanies()
      .subscribe(companies => {
        this.companies = companies.result.rows;
      });
  }

  getTitles() {
    this.titles = user;
  }

  addEmployee(from) {
    console.log(from);
  }

}
