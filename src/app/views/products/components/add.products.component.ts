import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';

@Component({
  templateUrl: 'add.products.component.html',
  providers: [ProductService]
})
export class AddProductsComponent {
  questions: any[];
  
  constructor(ps: ProductService ) { 
    this.questions = ps.getQuestions();
  }

}
