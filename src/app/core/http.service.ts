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


import { CustomReqeustOptions } from './request-options';
import { LoaderService } from './loader/loader.service';
import { HttpClient } from '@angular/common/http/src/client';
import { JwtService } from 'app/services';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Constants } from '../constants';

@Injectable()

export class HttpService extends Http {

    private apiUrl = Constants.API_URL;
    private jwt: JwtService;

    constructor( backend: XHRBackend, defaultOptions: CustomReqeustOptions, private loaderService: LoaderService) {
        super(backend, defaultOptions);
    }

    get(url: string, options?: RequestOptionsArgs): Observable<any> {

        this.showLoader();
        return super.get(this.getFullUrl(url), this.requestOptions(options))
                .catch(this.onCatch)
                .do((res: Response) => {
                    this.onSuccess(res.json());
                }, (error: any) => {
                    this.onError(error);
                })
                .finally(() => {
                    this.onEnd();
                })
    }

    post(url: string, body: Object, options?: RequestOptionsArgs): Observable<any> {

        this.showLoader();
        return super.post(this.getFullUrl(url), body, this.requestOptions(options))
                .catch(this.onCatch)
                .do((res: Response) => {
                    this.onSuccess(res.json());
                }, (error: any) => {
                    this.onError(error);
                })
                .finally(() => {
                    this.onEnd();
                })
    }

    put(url: string, body: Object, options?: RequestOptionsArgs): Observable<any> {

      this.showLoader();
      return super.post(this.getFullUrl(url), body, this.requestOptions(options))
        .catch(this.onCatch)
        .do((res: Response) => {
          this.onSuccess(res.json());
        }, (error: any) => {
          this.onError(error);
        })
        .finally(() => {
          this.onEnd();
        })
      }

      delete(url: string, options?: RequestOptionsArgs): Observable<any> {

        this.showLoader();
        return super.post(this.getFullUrl(url), this.requestOptions(options))
          .catch(this.onCatch)
          .do((res: Response) => {
            this.onSuccess(res.json());
          }, (error: any) => {
            this.onError(error);
          })
          .finally(() => {
            this.onEnd();
          })
      }

    private requestOptions(options?: RequestOptionsArgs): RequestOptionsArgs {
         if (options == null) {
             options = new CustomReqeustOptions();
         }

         if (options.headers == null) {
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
