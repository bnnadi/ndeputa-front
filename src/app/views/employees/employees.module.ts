import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

import { AddEmployeeComponent, DetailEmployeeComponent, ListEmployeeComponent } from './components';
import { EmployeeComponent } from './employees.component';

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesService } from '../../services/employees.service';


@NgModule({
  imports: [
    ReactiveFormsModule,
    SharedModule,
    EmployeesRoutingModule
  ],
  declarations: [ 
    EmployeeComponent,
    AddEmployeeComponent,
    DetailEmployeeComponent,
    ListEmployeeComponent
  ],
  providers: [EmployeesService, FormBuilder]
})
export class EmployeesModule { }
