import { NgModule } from "@angular/core";
import { ChartsModule } from "ng2-charts/ng2-charts";
import { TabsModule } from "ngx-bootstrap/tabs/tabs.module";

import { ProfileRoutingModule } from "./profile-routing.module";
import { ProfileComponent } from "./profile.component";
import { DetailProfileComponent } from "./components/detail.profile.component";
import { SharedModule } from 'app/shared/shared.module';


@NgModule({
    imports: [
        TimesheetRoutingModule,
        ChartsModule,
        TabsModule
    ],
    declarations: [ProfileComponent, DetailProfileComponent],
    providers: []
})
export class TimesheetModule {}