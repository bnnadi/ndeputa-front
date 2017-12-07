import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XHRBackend, RequestOptions } from '@angular/http';

import { HttpService } from './http.service';
import { httpServiceFactory } from './http-service.factory';
import { LoaderService } from './loader/loader.service';
import { LoaderComponent } from './loader/loader.component';
import { JwtHelper } from './jwt-helper.service';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
        CommonModule,
        NgbProgressbarModule
    ],
    exports: [
        LoaderComponent
    ],
    declarations: [
        LoaderComponent,
    ],
    providers: [
        LoaderService,
        {
            provide: HttpService,
            useFactory: httpServiceFactory,
            deps: [XHRBackend, RequestOptions , LoaderService]
        },
        JwtHelper
    ]
})

export class CoreModule {}
