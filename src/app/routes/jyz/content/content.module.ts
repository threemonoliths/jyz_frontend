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

import {CropperComponent} from '../self_profile/change_avatar.component';

import { NzMessageService } from 'ng-zorro-antd';

import { ImageCropperModule } from 'ng2-img-cropper';


// import { GlobalService } from '../../../services/global.service'; 
 
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ImageCropperModule,
    RouterModule.forChild(contentRoutes)
  ],
  declarations: [
    ContentComponent,
    DashboardComponent,
    ChangePwComponent,
    ChangeProfileComponent,
    CropperComponent
  ],
  providers: [
    NzMessageService
    // GlobalService
    // ContractService,
    // ConfirmationService
  ]
})
export class ContentModule { }