import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';
import { TableOrdersComponent } from './components';
import { OrdersComponent } from './orders.component';

const routes: Routes = [
  {
    path: '',
    component: TableOrdersComponent,
    data: {
      title: 'Orders'
    }, children: [
    
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule {}
