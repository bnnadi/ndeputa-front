import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { AnaylticsComponent } from './anayltics.component';

const routes: Routes = [
  {
    path: '',
    component: AnaylticsComponent,
    data: {
      title: 'Anayltics'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnaylticsRoutingModule {}
