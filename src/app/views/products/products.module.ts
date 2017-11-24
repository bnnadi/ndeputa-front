import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { AddProductsComponent, DetailProductsComponent, ListProductsComponent } from './components';
import { ProductsComponent } from './products.component';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductService } from 'app/services';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ProductsRoutingModule,
    FormsModule,
    SharedModule
  ],
  declarations: [ ProductsComponent, AddProductsComponent, DetailProductsComponent, ListProductsComponent ],
  providers: [ProductService, FormBuilder]
})

export class ProductsModule { }
