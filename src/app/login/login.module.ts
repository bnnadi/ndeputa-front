import { NgModule } from '@angular/core';

import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    LoginRoutingModule,
    FormsModule
  ],
  declarations: [ LoginComponent ]
})
export class LoginModule { }