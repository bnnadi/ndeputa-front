import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService, ProductService } from 'app/services';
import { Company, Product } from 'app/models';

@Component({
  templateUrl: 'add.products.component.html',
  styleUrls: ['products.component.css']
})
export class AddProductsComponent {
  companies: any;
  product: Product
  url: string;
  detailUrl: string;

  constructor(private ps: ProductService, private cs: CompanyService ) {
    this.getCompanies();
  }

  getCompanies() {
    this.cs.getCompanies()
      .subscribe(companies => {
        this.companies = companies.result.rows;
      });
  }

  addProduct(form: any) {
    console.log(form);
    this.ps.addProduct(form)
      .subscribe(product => {
        this.product = product;
        this.detailUrl = '/products/' + this.product.id;
      });

  }

  fileChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (event: any) => {
        this.url = event.target.result;
      }

      reader.readAsDataURL(event.target.files[0]);
    }
  }

}
