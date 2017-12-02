import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CustomerComponent } from './customer.component';
import { AddCustomerComponent, DetailCustomerComponent, ListCustomerComponent } from './components';
import { CanDeactivateGuard } from 'app/_access/can-deactivate-guard.service';
// import { CustomerResolver } from 'app/services';


const routes: Routes = [
    {
        path: '',
        component: ListCustomerComponent,
        data: {
            title: 'Customers'
        }
    },
    {
        path: '',
        component: CustomerComponent,
        data: {
            title: 'Customer'
        },
        children: [
            {
                path:'add',
                component: AddCustomerComponent,
                canDeactivate: [CanDeactivateGuard],
                data: {
                    title: 'Add'
                }
            },
            {
                path: ':id',
                component: DetailCustomerComponent,
                data: {
                    title: "Information"
                }
            },
        ]
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    // providers: [CustomerResolver]
})

export class CustomerRoutingModule {}
