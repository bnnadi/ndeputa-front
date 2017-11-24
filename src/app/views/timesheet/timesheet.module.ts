import { NgModule } from "@angular/core";
import { ChartsModule } from "ng2-charts/ng2-charts";
import { TabsModule } from "ngx-bootstrap/tabs/tabs.module";

import { TimesheetRoutingModule } from "./timesheet-routing.module";
import { TimesheetComponent } from "./timesheet.component";
import { ListTimesheetComponent } from "./components/list.timesheet.component";
import { SharedModule } from '../../shared/shared.module';


@NgModule({
    imports: [
        TimesheetRoutingModule,
        ChartsModule,
        TabsModule
    ],
    declarations: [TimesheetComponent, ListTimesheetComponent],
    providers: []
})
export class TimesheetModule {}