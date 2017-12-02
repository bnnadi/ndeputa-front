import { BaseRequestOptions } from '@angular/http';
import { JwtService } from 'app/services/jwt.service';

export class CustomReqeustOptions extends BaseRequestOptions {

    public token: String;

    constructor(customOptions?: any) {

        super();

        this.token = localStorage.getItem('token');
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Authorization', 'bearer ' + this.token);
    }

}
