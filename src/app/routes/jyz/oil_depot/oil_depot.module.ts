import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@shared/shared.module';


import { OilDepotComponent } from './oil_depot.component';
import { OilDepotFormComponent } from './form/form.component';
import { OilDepotListComponent } from './list/list.component';
import { OilDepotRoutes} from './oil_depot.routes';

import { OilDepotService } from '../../../services/oil_depot.service';

import { MainPipe } from '../../../pipes/pipe.module';

 
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MainPipe,
    RouterModule.forChild(OilDepotRoutes)
  ],
  declarations: [
    OilDepotComponent,
    OilDepotFormComponent,
    OilDepotListComponent
  ],
  providers: [
    OilDepotService,
    // ConfirmationService
  ]
})
export class OilDepotModule { }