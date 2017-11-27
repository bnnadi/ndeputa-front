import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products.component';
import { AddProductsComponent, DetailProductsComponent, ListProductsComponent } from './components';
import { ProductResolver } from 'app/services';
import { CanDeactivateGuard } from 'app/can-deactivate-guard.service';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/products',
    pathMatch: 'full'
  },
  {
    path: '',
    component: ListProductsComponent,
    data: {
      title: 'Products'
    }
  },
  {
    path: '',
    component: ProductsComponent,
    data: {
      title: 'Product'
    },
    children: [
      {
        path: 'add',
        component: AddProductsComponent,
        canDeactivate: [CanDeactivateGuard],
        data: {
          title: 'Add'
        }
      },
      {
        path: ':id',
        component: DetailProductsComponent,
        data: {
          title: 'Information'
        },
        resolve: {
          product: ProductResolver
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ProductResolver]
})
export class ProductsRoutingModule {}
