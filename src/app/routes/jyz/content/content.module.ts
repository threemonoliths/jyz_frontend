import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@shared/shared.module';


import { ContentComponent } from './content.component';
import { contentRoutes} from './content.routes';
import { DashboardComponent } from '../dashboard/dashboard.component';


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
    DashboardComponent

  ],
  providers: [
    // GlobalService
    // ContractService,
    // ConfirmationService
  ]
})
export class ContentModule { }