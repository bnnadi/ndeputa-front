import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddOrdersComponent, DetailOrdersComponent, TableOrdersComponent } from './components';
import { OrdersComponent } from './orders.component';
import { CanDeactivateGuard } from 'app/_access/can-deactivate-guard.service';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: '/orders',
  //   pathMatch: 'full',
  // },
  {
    path: '',
    component: TableOrdersComponent,
    data: {
      title: 'Orders'
    },
  },
  {
    path: '',
    component: OrdersComponent,
    data: {
      title: 'Order'
    },
    children: [
      {
        path: 'add',
        component: AddOrdersComponent,
        canDeactivate: [CanDeactivateGuard],
        data: {
          title: 'Add'
        }
      },
      {
        path: ':id',
        component: DetailOrdersComponent,
        data: {
          title: 'Information'
        },
        // resolve: { order: OrderResolver }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  // providers: [OrderResolver]
})
export class OrdersRoutingModule {}
