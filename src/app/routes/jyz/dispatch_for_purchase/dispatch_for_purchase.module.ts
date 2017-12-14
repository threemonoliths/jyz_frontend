import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@shared/shared.module';


import { DispatchForPurchaseComponent } from './dispatch_for_purchase.component';
import { DispatchForPurchaseFormComponent } from './form/form.component';
import { DispatchForPurchaseListComponent } from './list/list.component';
import { dispatchForPurchaseRoutes} from './dispatch_for_purchase.routes';

import { DispatchForPurchaseService } from '../../../services/dispatch_for_purchase.service';

import { MainPipe } from '../pipes/pipe.module';
//import { ContractService } from '../../_services/contract.service';
//import { RoleService } from '../../_services/role.service';

 
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MainPipe,
    RouterModule.forChild(dispatchForPurchaseRoutes)
  ],
  declarations: [
    DispatchForPurchaseComponent,
    DispatchForPurchaseFormComponent,
    DispatchForPurchaseListComponent
  ],
  providers: [
    DispatchForPurchaseService,
    // ConfirmationService
  ]
})
export class DispatchForPurchaseModule { }