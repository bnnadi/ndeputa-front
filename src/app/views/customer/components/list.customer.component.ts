import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'app/services';
import { Router } from '@angular/router';
import { Customer } from 'app/models/customer.model';


@Component({
    templateUrl: './list.customer.component.html'
})
export class ListCustomerComponent implements OnInit {

    customers: any = {count: Number, rows: Array};

    constructor(private cs:CustomerService, private router:Router) {}

    ngOnInit() {
        this.getCustomers();
    }

    getCustomers() {
        this.cs.getCustomers()
            .subscribe(customers => this.customers = customers);
    }

}