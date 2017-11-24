import { NgModule } from '@angular/core';

import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    LoginRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ LoginComponent ]
})
export class LoginModule { }