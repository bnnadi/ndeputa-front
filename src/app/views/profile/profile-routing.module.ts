import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { DetailProfileComponent } from './components/detail.profile.component';
import { ProfileComponent  } from './profile.component';

const routes: Routes = [
    {
        path: '',
        component: DetailProfileComponent,
        data: {
            title: 'Profile'
        }
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProfileRoutingModule{}