import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { ListTimesheetComponent } from './components/list.timesheet.component';
import { TimesheetComponent } from './timesheet.component';

const routes: Routes = [
    {
        path: '',
        component: ListTimesheetComponent,
        data: {
            title: 'Timesheets'
        }
    },
    {
        path: '',
        component: TimesheetComponent,
        children: []
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TimesheetRoutingModule{}