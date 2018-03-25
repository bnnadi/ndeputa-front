import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';

import { AddEmployeeComponent, DetailEmployeeComponent, ListEmployeeComponent } from './components';
import { EmployeeComponent } from './employees.component';

import { EmployeesRoutingModule } from './employees-routing.module';
import { CompanyService, EmployeesService } from 'app/services';


@NgModule({
  imports: [
    FormsModule,
    SharedModule,
    EmployeesRoutingModule
  ],
  declarations: [ 
    EmployeeComponent,
    AddEmployeeComponent,
    DetailEmployeeComponent,
    ListEmployeeComponent
  ],
  providers: [CompanyService, EmployeesService, FormBuilder]
})
export class EmployeesModule { }
