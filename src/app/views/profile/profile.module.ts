import { NgModule } from '@angular/core';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { DetailProfileComponent } from './components/detail.profile.component';
import { SharedModule } from 'app/shared/shared.module';


@NgModule({
    imports: [
        ProfileRoutingModule
    ],
    declarations: [ProfileComponent, DetailProfileComponent],
    providers: []
})
export class ProfileModule {}
