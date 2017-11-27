import { NgModule } from "@angular/core";
import { ChartsModule } from "ng2-charts/ng2-charts";
import { TabsModule } from "ngx-bootstrap/tabs/tabs.module";

import { SettingsRoutingModule } from "./settings-routing.module";
import { SettingsComponent } from "./settings.component";
// import { DetailSettingsComponent } from "./components/details.settings.component";
import { SharedModule } from '../../shared/shared.module';


@NgModule({
    imports: [
        SettingsRoutingModule,
        ChartsModule,
        TabsModule
    ],
    declarations: [ SettingsComponent ],
    providers: []
})
export class SettingsModule {}