import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { TabsModule } from 'ngx-bootstrap';

import { AddOrdersComponent, DetailOrdersComponent, TableOrdersComponent } from './components';
import { OrdersComponent } from './orders.component';

import { OrdersRoutingModule } from './orders-routing.module';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  imports: [
    OrdersRoutingModule,
    ChartsModule,
    TabsModule,
    SharedModule
  ],
  declarations: [ OrdersComponent, AddOrdersComponent, DetailOrdersComponent, TableOrdersComponent ],
  providers: []
})
export class OrdersModule { }
