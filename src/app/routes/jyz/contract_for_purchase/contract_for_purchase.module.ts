import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@shared/shared.module';


import { ContractForPurchaseComponent } from './contract_for_purchase.component';
import { ContractForPurchaseFormComponent } from './form/form.component';
import { ContractForPurchaseListComponent } from './list/list.component';
import { contractForPurchaseRoutes} from './contract_for_purchase.routes';

import { ContractForPurchaseService } from '../../../services/contract_for_purchase.service';
//import { ContractService } from '../../_services/contract.service';
//import { RoleService } from '../../_services/role.service';

 
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(contractForPurchaseRoutes)
  ],
  declarations: [
    ContractForPurchaseComponent,
    ContractForPurchaseFormComponent,
    ContractForPurchaseListComponent
  ],
  providers: [
    ContractForPurchaseService,
    // ConfirmationService
  ]
})
export class ContractForPurchaseModule { }