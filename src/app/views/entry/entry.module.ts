import { NgModule } from '@angular/core';
import { EntryComponent } from './entry.component';
import { EntryScanComponent } from './components/entry.scan.component';
import { EntryRoutingModule } from './entry-login.module';

@NgModule({
    imports: [EntryRoutingModule],
    declarations: [EntryComponent, EntryScanComponent]
})
export class EntryModule {}