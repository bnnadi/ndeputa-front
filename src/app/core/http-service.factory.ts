import { XHRBackend } from '@angular/http';
import { CustomReqeustOptions } from './request-options';
import { LoaderService } from './loader/loader.service';
import { HttpService } from './http.service';


function httpServiceFactory(backend: XHRBackend, opitions: CustomReqeustOptions, loaderService: LoaderService) {
    return new HttpService(backend, opitions, loaderService);
}

export { httpServiceFactory };
