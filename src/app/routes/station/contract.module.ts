import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import {StationFormComponent} from './test/form.component';
import { StationListComponent } from './list/list.component';

const routes: Routes = [
  { path: '', component: StationListComponent },
  { path: 'form', component: StationFormComponent },
  { path: 'updateform', component: StationFormComponent }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    StationListComponent,
    StationFormComponent
  ],
  exports: [
    RouterModule
  ]
})
export class ContractModule { }
