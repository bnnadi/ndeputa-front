import { BaseRequestOptions } from '@angular/http';

export class CustomReqeustOptions extends BaseRequestOptions {

    public token: string;

    constructor(customOptions?: any) {

        super();

            let token = localStorage.getItem('token');
            this.token = token;
            this.headers.append('Content-Type', 'application/json');
            this.headers.append('Authorization', 'JWT ' + this.token);
    }

}