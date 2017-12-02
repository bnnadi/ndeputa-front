import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { DetailSettingsComponent } from './components/detail.settings.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
    imports: [
        SettingsRoutingModule,
        ChartsModule
    ],
    declarations: [ SettingsComponent, DetailSettingsComponent ],
    providers: []
})
export class SettingsModule {}
