import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeeComponent } from './employees.component';
import { AddEmployeeComponent, DetailEmployeeComponent, ListEmployeeComponent } from './components';
import { CanDeactivateGuard } from 'app/can-deactivate-guard.service';
// import { EmployeeResolver } from 'app/services';

const routes: Routes = [
  {
    path: '',
    component: ListEmployeeComponent,
    data: {
      title: 'Employees'
    }
  },
  {
    path: '',
    component: EmployeeComponent,
    data: {
      title: 'Employee'
    },
    children: [
      {
        path: ':id',
        component: DetailEmployeeComponent,
        data: {
          title: 'Information'
        },
        pathMatch: 'full'
      },
      {
        path: 'add',
        component: AddEmployeeComponent,
        canDeactivate: [CanDeactivateGuard],
        data: {
          title: 'Add'
        },
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  // providers: [EmployeeResolver]
})
export class EmployeesRoutingModule {}
