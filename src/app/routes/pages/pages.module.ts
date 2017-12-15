import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { LoginComponent } from './login/login.component';
import { StepFormComponent } from './register/step-form.component';
import { Step1Component } from './register/step1.component';
import { Step2Component } from './register/step2.component';
import { Page404Component } from './404/404.component';
import { Page500Component } from './500/500.component';


@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    LoginComponent,
    StepFormComponent,
    Step1Component,
    Step2Component,
    Page404Component,
    Page500Component
  ],

})
export class PagesModule { }
