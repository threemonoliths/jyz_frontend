import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@shared/shared.module';
import { OilDepotService } from '../../../services/oil_depot.service';
import { StockChangeComponent } from './stock_change.component';
import { StockChangeFormComponent } from './form/form.component';
import { StockChangeListComponent } from './list/list.component';
import {stockChangeRoutes} from './stock_change.routes';

import { StockChangeService } from '../../../services/stock_change.service';

import { MainPipe } from '../pipes/pipe.module';
 
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MainPipe,
    RouterModule.forChild(stockChangeRoutes)
  ],
  declarations: [
    StockChangeComponent,
    StockChangeFormComponent,
    StockChangeListComponent
  ],
  providers: [
    OilDepotService,
    StockChangeService,
    // ConfirmationService
  ]
})
export class StockChangeModule { }