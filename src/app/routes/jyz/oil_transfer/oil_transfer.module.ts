import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@shared/shared.module';


import { OilTransferComponent } from './oil_transfer.component';
import { OilTransferFormComponent } from './form/form.component';
import { OilTransferListComponent } from './list/list.component';
import { oilTransferRoutes} from './oil_transfer.routes';

import { OilTransferService } from '../../../services/oil_transfer.service';

import { MainPipe } from '../../../pipes/pipe.module';

 
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MainPipe,
    RouterModule.forChild(oilTransferRoutes)
  ],
  declarations: [
    OilTransferComponent,
    OilTransferFormComponent,
    OilTransferListComponent
  ],
  providers: [
    OilTransferService,
    // ConfirmationService
  ]
})
export class OilTransferModule { }