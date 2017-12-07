import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColumnSetting } from 'app/shared/layout.model';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'app/services';

@Component({
  templateUrl: './table.orders.component.html'
})
export class TableOrdersComponent implements OnInit {

  orders: any;

  orderSettings: ColumnSetting[] = [
      {
        primaryKey: 'name',
        header: 'Name'
    },
    {
        primaryKey: 'qty',
        header: 'Quantity'
    },
    {
        primaryKey: 'cost',
        header: 'Cost'
    },
    {
      primaryKey: 'sales_agent',
      header: 'Sales Agent'
    },
  ]

  constructor(private us: UserService ) { }

  ngOnInit() {}

  beforeChange($e: NgbTabChangeEvent) {
    if (this.us.getAccess() !== ($e.nextId || 'full')) {
      $e.preventDefault();
    }
  }

}
