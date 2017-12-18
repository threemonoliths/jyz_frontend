import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DictService } from '../../../services/dict.service';
import { SharedModule } from '@shared/shared.module';


import { CarryForAccountComponent } from './carry_for_account.component';
import { CarryForAccountFormComponent } from './form/form.component';
import { CarryForAccountListComponent } from './list/list.component';
import { contractForPurchaseRoutes} from './carry_for_account.routes';

import { CarryForAccountService } from '../../../services/carry_for_account.service';

import { MainPipe } from '../pipes/pipe.module';

 
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MainPipe,
    RouterModule.forChild(contractForPurchaseRoutes)
  ],
  declarations: [
    CarryForAccountComponent,
    CarryForAccountFormComponent,
    CarryForAccountListComponent
  ],
  providers: [
    DictService,
    CarryForAccountService,
    // ConfirmationService
  ]
})
export class CarryForAccountModule { }