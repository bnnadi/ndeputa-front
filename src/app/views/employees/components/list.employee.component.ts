import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeesService } from 'app/services';
import { Employee } from 'app/models';

@Component({
  templateUrl: 'list.employee.component.html'
})
export class ListEmployeeComponent implements OnInit {

  employees: any = {count: Number, rows: Array};
  totalEmployees: number

  constructor(private es: EmployeesService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
   this.getEmployees();
  }

  getEmployees() {
    this.es.getEmployees()
        .subscribe(employees => this.employees = employees);
    this.totalEmployees = this.employees.count;
  }

}
