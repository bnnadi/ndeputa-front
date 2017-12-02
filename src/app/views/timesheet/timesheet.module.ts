import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap/tabset/tabset.module';

import { TimesheetRoutingModule } from './timesheet-routing.module';
import { TimesheetComponent } from './timesheet.component';
import { ListTimesheetComponent } from './components/list.timesheet.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
    imports: [
        TimesheetRoutingModule,
        ChartsModule,
        NgbTabsetModule,
    ],
    declarations: [TimesheetComponent, ListTimesheetComponent],
    providers: []
})
export class TimesheetModule {}
