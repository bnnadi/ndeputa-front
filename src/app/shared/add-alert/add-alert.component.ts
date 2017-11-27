import { Component, Input } from '@angular/core';
@Component({
    selector: 'app-alert',
    templateUrl: 'add-alert.component.html'
})
export class AddAlertComponent {
    @Input() link: string;
}