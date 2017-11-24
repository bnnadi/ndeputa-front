import { Component, Input, OnChanges } from '@angular/core';
import { ColumnSetting } from '../layout.model';

@Component({
    selector: 'ct-table',
    templateUrl: './table-layout.component.html'
})

export class TableLayoutComponent implements OnChanges {
    @Input() records: any[];
    @Input() caption: string;
    @Input() settings: ColumnSetting[];
    columnMaps: ColumnSetting[];

    ngOnChanges() {

        if (this.settings) {
            this.columnMaps = this.settings;
        } else {
            this.columnMaps = Object.keys(this.records[0])
            .map(key => {
                return {
                    primaryKey: key,
                    header: key.slice(0, 1).toUpperCase() +
                    key.replace(/_/g, '').slice(1),
                    format: 'default'
                }
            });
        }
    }
}