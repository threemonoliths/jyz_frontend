import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { Page404Component } from './404/404.component';
import { Page500Component } from './500/500.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    Page404Component,
    Page500Component
  ]
})
export class PagesModule { }
