import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@shared/shared.module';


import { DictComponent } from './dict.component';
import { DictFormComponent } from './form/form.component';
import { DictListComponent } from './list/list.component';
import {  dictRoutes} from './dict.routes';
import { DictService } from '../../../services/dict.service';

import { MainPipe } from '../../../pipes/pipe.module';

 
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MainPipe,
    RouterModule.forChild(dictRoutes)
  ],
  declarations: [
    DictComponent,
    DictFormComponent,
    DictListComponent
  ],
  providers: [
    DictService,
    // ConfirmationService
  ]
})
export class DictModule { }