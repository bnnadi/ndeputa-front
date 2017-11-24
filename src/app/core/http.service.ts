import { Injectable } from '@angular/core';
import { 
    Http,
    RequestOptions,
    RequestOptionsArgs,
    Response,
    Request,
    Headers,
    XHRBackend
} from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { CustomReqeustOptions } from './request-options';
import { LoaderService } from './loader/loader.service';
import { HttpClient } from '@angular/common/http/src/client';

@Injectable()

export class HttpService extends Http {

    public token: string;

    apiUrl = 'http://localhost:3006/api/v1/';

    constructor( backend: XHRBackend, defaultOptions: CustomReqeustOptions, private loaderService: LoaderService) {
        super(backend, defaultOptions);

        console.log('The HttpService');
        console.log('Api route is ', this.apiUrl);
    }

    get(url: string, options?: RequestOptionsArgs): Observable<any> {
        console.log('Getting data...');

        this.showLoader();
        return super.get(this.getFullUrl(url), this.requestOptions(options))
                .catch(this.onCatch)
                .do((res: Response) => {
                    this.onSuccess(res);
                }, (error: any) => {
                    this.onError(error);
                })
                .finally(() => {
                    this.onEnd();
                })
    }

    post(url: string, body: Object, options?: RequestOptionsArgs): Observable<any> {
        console.log('Sending data...');

        this.showLoader();
        return super.post(this.getFullUrl(url), body, this.requestOptions(options))
                .catch(this.onCatch)
                .do((res: Response) => {
                    console.log(res);
                    this.onSuccess(res);
                }, (error: any) => {
                    this.onError(error);
                })
                .finally(() => {
                    this.onEnd();
                })
    }

    private requestOptions(options?: RequestOptionsArgs): RequestOptionsArgs {
         if(options == null) {
             options = new CustomReqeustOptions();
         }

         if(options.headers == null) {
             options.headers = new Headers();
         }

         return options;
    }

    private getFullUrl(url: string): string {
        return this.apiUrl + url;
    }

    private onCatch(error: any, caught: Observable<any>): Observable<any> {
        return Observable.throw(error);
    }

    private onSuccess(res: Response): void {
        console.log('Request Successful');
    }

    private onError(res: Response): void {
        console.log('Error, status code: ' + res.status);
    }

    private onEnd(): void {
        this.hideLoader();
    }

    private showLoader(): void {
        this.loaderService.show();
    }

    private hideLoader(): void {
        this.loaderService.hide();
    }

}