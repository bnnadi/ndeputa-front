import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { NavBarService } from 'app/services/navbar.service';


@Component({
    selector: 'app-add-btn',
    template:`
    <div *ngIf="nav.visible" class="btn-group" role="group" aria-label="Adds Product, Customer, or Employee">
        <a class="btn" routerLink="{{addPath}}"><i class="icon-plus"></i> &nbsp;Add</a>
    </div>`,
    providers: [NavBarService]
})
export class AppAddBtnComponent {
    show = false;
    addPath: string;
    blackListed: string[] = ['dashbord', 'anayltics'];

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        public nav: NavBarService
    ){
        this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event) => {
            let currentRoute = this.route.root,
            url = '';;
            do {

            console.log(currentRoute.snapshot)
              const childrenRoutes = currentRoute.children;
              currentRoute = null;
              childrenRoutes.forEach(route => {
               
              });
            } while (currentRoute);
        })
    }
}