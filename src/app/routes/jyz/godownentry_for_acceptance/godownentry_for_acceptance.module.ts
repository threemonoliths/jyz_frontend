import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@shared/shared.module';

import { OilDepotService } from '../../../services/oil_depot.service';
import { GodownentryForAcceptanceComponent } from './godownentry_for_acceptance.component';
import { GodownentryForAcceptanceFormComponent } from './form/form.component';
import { GodownentryForAcceptanceListComponent } from './list/list.component';
import { godownentryForAcceptanceRoutes} from './godownentry_for_acceptance.routes';
import { GodownentryForAcceptanceService } from '../../../services/godownentry_for_acceptance.service';
import { DictService } from '../../../services/dict.service';
import { MainPipe } from '../pipes/pipe.module';

 
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MainPipe,
    RouterModule.forChild(godownentryForAcceptanceRoutes)
  ],
  declarations: [
    GodownentryForAcceptanceComponent,
    GodownentryForAcceptanceFormComponent,
    GodownentryForAcceptanceListComponent
  ],
  providers: [
    OilDepotService,
    DictService,
    GodownentryForAcceptanceService,
    // ConfirmationService
  ]
})
export class GodownentryForAcceptanceModule { }