import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
    templateUrl: './detail.customer.component.html'
})
export class DetailCustomerComponent {

    constructor(private route: ActivatedRoute,
      private router: Router,
      private location: Location) {}

    goBack(): void {
      this.location.back();
    }

}
