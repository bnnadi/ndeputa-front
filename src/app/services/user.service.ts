import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { HttpService } from '../core/http.service';

import { User } from '../models';


@Injectable()
export class UserService {
    private endpointUser = 'user.json';
    
    constructor(private http: HttpService) {}

    getUser(id:string):Observable<User> {
        return this.http.get(this.endpointUser)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error));
    }
        
    updateUser(body : Object): Observable<User> {
        let bodyString = JSON.stringify(body);
                
        return this.http.put(this.endpointUser, body)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error));
    }

    updateAddress(body : Object): Observable<User> {
        let bodyString = JSON.stringify(body);
                
        return this.http.put(this.endpointUser, body)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error));
    }

    updatePhone(body : Object): Observable<User> {
        let bodyString = JSON.stringify(body);
                
        return this.http.put(this.endpointUser, body)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error));
    }


}