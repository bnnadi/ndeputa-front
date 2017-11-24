import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';


@Component({
    selector: 'app-add-btn',
    template:`
    <div *ngIf="show" class="btn-group" role="group" aria-label="Adds Product, Customer, or Employee">
        <a class="btn" routerLink="{{addPath}}"><i class="icon-plus"></i> &nbsp;Add</a>
    </div>`
})
export class AppAddBtnComponent {
    show = false;
    addPath: string;
    blackListed: string[] = ['Dashbord', 'Anayltics'];

    constructor(
        private router: Router,
        private route: ActivatedRoute
    ){
        this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event) => {
            let currentRoute = this.route.root,
            url = '';
            do {
              const childrenRoutes = currentRoute.children;
              currentRoute = null;
              // tslint:disable-next-line:no-shadowed-variable
              childrenRoutes.forEach(route => {
                if (route.outlet === 'primary') {
                  if (route.snapshot.data.title && this.blackListed.find( x => x !== route.snapshot.data.title)) {
                      this.show = true;
                      this.addPath = '/'+route.snapshot.data.title.toLowerCase() + '/add'
                  }  
                  currentRoute = route;
                }
              });
            } while (currentRoute);
        })
    }
}