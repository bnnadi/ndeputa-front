import { Component, Input } from "@angular/core";

@Component({
    selector: 'app-status-info-card',
    templateUrl: './status-info-card.component.html'
})

export class StatusInfoCardComponent {
    @Input() obj: any;
    valuenow;

    constructor() {}
}