import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailSettingsComponent } from './components/detail.settings.component';
import { SettingsComponent } from './settings.component';

const routes: Routes = [
    {
        path: '',
        component: DetailSettingsComponent,
        data: {
            title: 'Timesheets'
        }
    },
    {
        path: '',
        component: SettingsComponent,
        children: []
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SettingsRoutingModule {}
