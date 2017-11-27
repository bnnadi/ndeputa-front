import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { User } from 'app/models';
import { EmployeesService } from 'app/services';

@Component({
  templateUrl: 'detail.employee.component.html'
})
export class DetailEmployeeComponent implements OnInit {
  @Input() employee: User;

  constructor(private route:ActivatedRoute, 
    private router:Router, 
    private location: Location,
    private es:EmployeesService) { 

  }

  ngOnInit() {
    this.getEmployee();
  }

  getEmployee () {
    const id = +this.route.snapshot.paramMap.get('id');
    this.es.getEmployee(id)
    .subscribe(employee => this.employee = employee);
  }

  goBack(): void {
    this.location.back();
  }

}