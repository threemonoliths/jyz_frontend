import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@shared/shared.module';


import { ContentComponent } from './content.component';
import { contentRoutes} from './content.routes';
import { DashboardComponent } from '../dashboard/dashboard.component';
import {ChangePwComponent} from '../self_profile/change_password.component';
import {ChangeProfileComponent} from '../self_profile/change_profile.component';

import { NzMessageService } from 'ng-zorro-antd';


// import { GlobalService } from '../../../services/global.service'; 
 
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(contentRoutes)
  ],
  declarations: [
    ContentComponent,
    DashboardComponent,
    ChangePwComponent,
    ChangeProfileComponent
  ],
  providers: [
    NzMessageService
    // GlobalService
    // ContractService,
    // ConfirmationService
  ]
})
export class ContentModule { }