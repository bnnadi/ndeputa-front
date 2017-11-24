import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntryComponent } from './entry.component';
import { EntryScanComponent } from './components/entry.scan.component';
const routes: Routes = [
    {
        path: '',
        component: EntryComponent,
        data: {
            title: 'Entry'
        },
        children: [
            {
                path:'',
                component: EntryScanComponent,
                data: {
                    title: ''
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EntryRoutingModule {}