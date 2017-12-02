import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Product } from '../models/product.model';


import { HttpService } from 'app/core/http.service';
import { DropdownQuestion, TextboxQuestion, QuestionBase } from 'app/app-dynamic-form/core';
import { Observable } from 'rxjs/Observable';
import { PRODUCTS } from '../fake/mock-products';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ProductService {

    private endpoint = 'product.json';

    constructor (private http: HttpService) {}

    getProducts(): Observable<any> {

        return this.http.get('products.json')
                .map((res: Response) => res.json())
                .catch((error: any) => Observable.throw(error.json()));
    }

    getProduct(id: string): Observable<Product> {
        return this.http.get(this.endpoint)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error));
    }

    addProduct(body: Object): Observable<Product> {
        const bodyString = JSON.stringify(body);

        return this.http.post(this.endpoint, body)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error));
    }

    updateProduct(body: Object): Observable<Product> {
        const bodyString = JSON.stringify(body);

        return this.http.put(this.endpoint, body)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error));
    }

    removeProduct(id: string): Observable<Product> {
        return this.http.delete(`${this.endpoint}/${id}.json`)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error));
    }
}
