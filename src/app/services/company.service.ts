import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';


import { HttpService } from 'app/core/http.service';
import { Company } from '../models/company.model';


@Injectable()
export class CompanyService {
    constructor(private http: HttpService) {}

    getCompanies(): Observable<any> {
        return this.http.get('companies.json')
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error));
    }
}
