import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeesService, CompanyService } from 'app/services';
import { User, Company } from 'app/models';

@Component({
  templateUrl: 'add.employee.component.html'
})
export class AddEmployeeComponent {
  
  employee: User;
  companies: any;

  constructor(private es:EmployeesService, private cs:CompanyService) {
    this.getCompanies();
  }

  getCompanies() {
    this.cs.getCompanies()
      .subscribe(companies => {
        this.companies = companies.result.rows;
      });
  }

  addEmployee(from) {
    console.log(from);
  }

}