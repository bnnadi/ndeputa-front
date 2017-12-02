import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { NavBarService } from 'app/services/navbar.service';


@Component({
    selector: 'app-add-btn',
    template: `
    <div *ngIf="nav.visible" class="btn-group" role="group" aria-label="Adds Product, Customer, or Employee">
        <a class="btn btn-lg" routerLink="{{addPath}}"><i class="icon-plus"></i> &nbsp;Add</a>
    </div>`,
    styleUrls: ['app-btn.css'],
    providers: [NavBarService]
})
export class AppAddBtnComponent {
    addPath: string;
    whiteListed: string[] = ['/products', '/customers', '/orders', '/employees'];

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        public nav: NavBarService
    ){

        this.router.events.filter(event => event instanceof NavigationEnd).subscribe((url:any) => {
            if(url.url && this.whiteListed.find(x => x === url.url)) {
                this.nav.show();
                this.addPath = url.url + '/add';
            } else {
                this.nav.hide();
            }
        });

    }
}
