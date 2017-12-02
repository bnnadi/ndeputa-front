import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';


import { Product, User } from 'app/models';
import { ProductService } from './product.service';
import { EmployeesService } from './employees.service';
import { CustomerService } from 'app/services';
import { Customer } from '../models/customer.model';
import 'rxjs/add/operator/take';
@Injectable()
export class ProductResolver implements Resolve<Product> {
    constructor(private ps: ProductService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product> {
        const id = route.paramMap.get('id');

        return this.ps.getProduct(id).take(1).map(product => {
            if(product) {
                return product;
            } else {
                this.router.navigate(['/products']);
                return null;
            }
        });
    }
}

// TODO: tis is needed for the other routes as well

// @Injectable()
// export class EmployeeResolver implements Resolve<User> {
//     constructor(private es: EmployeesService, private router: Router) {}

//     resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product> {
//         let id = route.paramMap.get('id');

//         return this.es.getEmployee(id).take(1).map(employee => {
//             if(employee) {
//                 return employee;
//             } else {
//                 this.router.navigate(['/employees']);
//                 return null;
//             }
//         });
//     }
// }

// @Injectable()
// export class CustomerResolver implements Resolve<Customer> {
//     constructor(private cs: CustomerService, private router: Router) {}

//     resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product> {
//         let id = route.paramMap.get('id');

//         return this.cs.getCustomer(id).take(1).map(customer => {
//             if(customer) {
//                 return customer;
//             } else {
//                 this.router.navigate(['/customers']);
//                 return null;
//             }
//         });
//     }
// }
