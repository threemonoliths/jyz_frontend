import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@shared/shared.module';
import { OilDepotService } from '../../../services/oil_depot.service';

import { MeteringForReturnComponent } from './metering_for_return.component';
import { MeteringForReturnFormComponent } from './form/form.component';
import { MeteringForReturnListComponent } from './list/list.component';
import { meteringForReturnComponentRoutes} from './metering_for_return.routes';

import { MeteringForReturnService } from '../../../services/metering_for_return.service';

import { MainPipe } from '../../../pipes/pipe.module';
//import { ContractService } from '../../_services/contract.service';
//import { RoleService } from '../../_services/role.service';

 
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MainPipe,
    RouterModule.forChild(meteringForReturnComponentRoutes)
  ],
  declarations: [
    MeteringForReturnComponent,
    MeteringForReturnFormComponent,
    MeteringForReturnListComponent
  ],
  providers: [
    MeteringForReturnService,
    OilDepotService
    // ConfirmationService
  ]
})
export class MeteringForReturnModule { }