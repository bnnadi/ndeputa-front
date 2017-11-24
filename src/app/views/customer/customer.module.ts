import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder } from '@angular/forms';
import { CustomerRoutingModule } from './customer-routing.module';
import { AddCustomerComponent, DetailCustomerComponent, ListCustomerComponent } from './components';
import { CustomerService } from 'app/services/customer.service';
import { CustomerComponent } from './customer.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CustomerRoutingModule,
    SharedModule
  ],
  declarations: [
    CustomerComponent,
    AddCustomerComponent,
    DetailCustomerComponent,
    ListCustomerComponent
  ],
  providers: [CustomerService, FormBuilder]
})
export class CustomerModule { }
