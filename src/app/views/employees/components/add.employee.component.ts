import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeesService } from 'app/services';
import { User } from '../../../models';

@Component({
  templateUrl: 'add.employee.component.html'
})
export class AddEmployeeComponent {
  
  employee: User;

  constructor(private employeeService:EmployeesService) { 

  }


}