import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from 'app/services';
import { Product } from 'app/models';

@Component({
  templateUrl: 'list.products.component.html'
})
export class ListProductsComponent implements OnInit {
  products: Product[];

  constructor(private ps: ProductService ) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.ps.getProducts()
      .subscribe(products => this.products = products);
  }

}
