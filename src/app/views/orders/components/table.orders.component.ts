import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColumnSetting } from 'app/shared/layout.model';

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

  constructor( ) { }

  ngOnInit() {}

}
