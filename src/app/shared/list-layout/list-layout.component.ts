import { Component, OnChanges, Input } from '@angular/core';

@Component({
    selector: 'ct-list',
    templateUrl: './list-layout.component.html'
})
export class ListLayoutComponent implements OnChanges {
    @Input() records: any[];

    ngOnChanges() {}
}