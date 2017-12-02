import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { DetailProfileComponent } from './components/detail.profile.component';
import { SharedModule } from 'app/shared/shared.module';


@NgModule({
    imports: [
        ProfileRoutingModule,
        ChartsModule
    ],
    declarations: [ProfileComponent, DetailProfileComponent],
    providers: []
})
export class ProfileModule {}
