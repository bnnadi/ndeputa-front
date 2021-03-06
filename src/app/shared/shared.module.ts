import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { TableLayoutComponent } from './table-layout/table-layout.component';
// import { TabLayoutComponent } from './tab-layout/tab-layout.component';
import { FormatCellPipe } from './format-cell.pipe';
import { EmployeeCardComponent } from './employee-card/employee-card.component';
import { ListLayoutComponent } from './list-layout/list-layout.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [
        EmployeeCardComponent,
        TableLayoutComponent,
        ListLayoutComponent,
        // TabLayoutComponent, 
        FormatCellPipe
    ],
    exports: [
        CommonModule,
        EmployeeCardComponent,
        TableLayoutComponent,
        ListLayoutComponent
        // TabLayoutComponent
    ],
    providers: [CurrencyPipe]
})

export class SharedModule {}