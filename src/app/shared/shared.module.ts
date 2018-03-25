import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { TableLayoutComponent } from './table-layout/table-layout.component';
import { FormatCellPipe } from './format-cell.pipe';
import { EmployeeCardComponent } from './employee-card/employee-card.component';
import { ListLayoutComponent } from './list-layout/list-layout.component';
import { AddAlertComponent } from './add-alert/add-alert.component';
import { SaleCardComponent } from './sale-card/sale-card.component';
import { StatusInfoCardComponent } from './status-info-card/status-info-card.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ChartsModule
    ],
    declarations: [
        EmployeeCardComponent,
        TableLayoutComponent,
        ListLayoutComponent,
        AddAlertComponent,
        SaleCardComponent,
        StatusInfoCardComponent,
        FormatCellPipe
    ],
    exports: [
        CommonModule,
        EmployeeCardComponent,
        TableLayoutComponent,
        ListLayoutComponent,
        AddAlertComponent,
        SaleCardComponent,
        StatusInfoCardComponent
    ],
    providers: [CurrencyPipe]
})

export class SharedModule {}
