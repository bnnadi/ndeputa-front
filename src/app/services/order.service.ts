import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { HttpService } from '../core/http.service';

import { Order } from '../models';


@Injectable()
export class OrderService {
    private endpoint = 'order.json';

    constructor(private http: HttpService) {}

    getOrders(): Observable<any> {

                return this.http.get('orders.json')
                        .map((res: Response) => res.json())
                        .catch((error: any) => Observable.throw(error.json()));
            }

            getOrder(id: string): Observable<Order> {
                return this.http.get(this.endpoint)
                    .map((res: Response) => res.json())
                    .catch((error: any) => Observable.throw(error));
            }

            addOrder(body: Object): Observable<Order> {
                const bodyString = JSON.stringify(body);

                return this.http.post(this.endpoint, body)
                    .map((res: Response) => res.json())
                    .catch((error: any) => Observable.throw(error));
            }

            updateOrder(body: Object): Observable<Order> {
                const bodyString = JSON.stringify(body);

                return this.http.put(this.endpoint, body)
                    .map((res: Response) => res.json())
                    .catch((error: any) => Observable.throw(error));
            }

            removeOrder(id: string): Observable<Order> {
                return this.http.delete(`${this.endpoint}/${id}.json`)
                    .map((res: Response) => res.json())
                    .catch((error: any) => Observable.throw(error));
            }

}
