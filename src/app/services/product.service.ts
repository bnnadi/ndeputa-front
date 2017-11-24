import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Product } from '../models/product.model';


import { HttpService } from '../core/http.service';
import { DropdownQuestion, TextboxQuestion, QuestionBase } from 'app/app-dynamic-form/core';
import { Observable } from 'rxjs/Rx';
import { PRODUCTS } from '../fake/mock-products';
import { of } from 'rxjs/observable/of';
@Injectable()
export class ProductService {

    private endpoint = 'products.json';

    constructor (private http: HttpService) {}

    getQuestions() {
        let questions: QuestionBase<any>[] = [
            new DropdownQuestion({
                key: 'brave',
                label: 'Bravery Rating',
                options: [
                  {key: 'solid',  value: 'Solid'},
                  {key: 'great',  value: 'Great'},
                  {key: 'good',   value: 'Good'},
                  {key: 'unproven', value: 'Unproven'}
                ],
                order: 3
              }),
         
              new TextboxQuestion({
                key: 'firstName',
                label: 'First name',
                type: 'text',
                required: true,
                order: 1
              }),
         
              new TextboxQuestion({
                key: 'emailAddress',
                label: 'Email',
                type: 'email',
                order: 2
              })
            ];
         
            return questions.sort((a, b) => a.order - b.order);
    };

    // getProducts() : Observable<Product[]> {
    //     return of (PRODUCTS);
    // }

    // getProduct(id: number) : Observable<Product> {
    //     return of(PRODUCTS.find(product => product.id === id));
    // }

    getProducts(): Observable<Product[]> {

        return this.http.get(this.endpoint)
                .map((res:Response) => res.json())
                .catch((error:any) => Observable.throw(error.json()));
    }
    // TODO: look into how the route is structured
    getProduct(id:string):Observable<Product> {
        return this.http.get(this.endpoint)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json()));
    }

    addProduct(body : Object): Observable<Product[]> {
        let bodyString = JSON.stringify(body);

        return this.http.post(this.endpoint, body)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json()));
    }

    updateProduct(body : Object): Observable<Product[]> {
        let bodyString = JSON.stringify(body);
        
        return this.http.put(`${this.endpoint}/${body['id']}`, body)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json()));
    }

    removeProduct(id:string): Observable<Product[]> {
        return this.http.delete(`${this.endpoint}/${id}`)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json()));
    }
}