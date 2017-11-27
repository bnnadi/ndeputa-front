import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from 'app/models';
import { Location } from '@angular/common';
import { ProductService } from 'app/services';

@Component({
  templateUrl: 'detail.products.component.html'
})
export class DetailProductsComponent implements OnInit {
  @Input() product: Product;

  constructor(private ps:ProductService, private route:ActivatedRoute, private location: Location) { }

  ngOnInit() {
    this.getProduct();
  }

  getProduct () {
    const id = +this.route.snapshot.paramMap.get('id');
    // this.ps.getProduct(id)
    // .subscribe(product => this.product = product);
  }

  goBack(): void {
    this.location.back();
  }
}
