import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from 'app/_access/can-deactivate-guard.service';

// Import Containers
import {
  FullLayoutComponent,
  SimpleLayoutComponent
} from './containers';
import { PageNotFoundComponent } from 'app/error-pages';
import { AuthGuard } from 'app/_access/auth-guard.service';
import { ForgotPasswordComponent } from './login/forgot-password.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: FullLayoutComponent,
    data: {
      title: 'Home'
    },
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: './views/dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'products',
        loadChildren: './views/products/products.module#ProductsModule'
      },
      {
        path: 'customers',
        loadChildren: './views/customer/customer.module#CustomerModule'
      },
      {
        path: 'orders',
        loadChildren: './views/orders/orders.module#OrdersModule'
      },
      {
        path: 'employees',
        loadChildren: './views/employees/employees.module#EmployeesModule'
      },
      {
        path: 'timesheet',
        loadChildren: './views/timesheet/timesheet.module#TimesheetModule'
      },
      {
        path: 'profile',
        loadChildren: './views/profile/profile.module#ProfileModule'
      },
      {
        path: 'settings',
        loadChildren: './views/settings/settings.module#SettingsModule'
      },
      // {
      //   path: 'messages',
      //   loadChildren: './views/profile/profile.module#ProfileModule'
      // },
      // {
      //   path: 'tasks',
      //   loadChildren: './views/settings/settings.module#SettingsModule'
      // }
    ]
  },
  {
    path: '',
    component: SimpleLayoutComponent,
    data: {},
    children: [
      {
        path: 'login',
        loadChildren: './login/login.module#LoginModule',
       },
       {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
       },
       {
        path: 'entry',
        loadChildren: './views/entry/entry.module#EntryModule',
       },
       {
        path: '**',
        component: PageNotFoundComponent,
       },
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes
  ) ],
  exports: [ RouterModule ],
  providers: [ CanDeactivateGuard ]
})
export class AppRoutingModule {}
