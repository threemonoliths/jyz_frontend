import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import {ContractFormComponent} from './form/form.component';
import { ContractListComponent } from './list/list.component';

const routes: Routes = [
  { path: '', component: ContractListComponent },
  { path: 'form', component: ContractFormComponent },
  { path: 'updateform', component: ContractFormComponent }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ContractListComponent,
    ContractFormComponent
  ],
  exports: [
    RouterModule
  ]
})
export class ContractModule { }
