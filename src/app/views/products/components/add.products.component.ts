import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService, ProductService } from 'app/services';
import { Company } from 'app/models/company.model';

@Component({
  templateUrl: 'add.products.component.html',
  providers: []
})
export class AddProductsComponent {
  companies: any;
  url: string;

  constructor(ps: ProductService, private cs: CompanyService ) { 
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
  }

  fileChange(event:any) {
    if(event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event:any) => {
        this.url = event.target.result;
      }

      reader.readAsDataURL(event.target.files[0]);
    }
  }

}
