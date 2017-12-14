import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@shared/shared.module';

import { UserManagementFormComponent } from './form/form.component';
import { UserManagementComponent } from './user_management.component';
import { UserManagementListComponent } from './list/list.component';
import { userManagementRoutes} from './user_management.routes';

import { UserManagementService } from '../../../services/user_management.service';

import { MainPipe } from '../pipes/pipe.module';

 
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MainPipe,
    RouterModule.forChild(userManagementRoutes)
  ],
  declarations: [
    UserManagementComponent,
    UserManagementFormComponent,
    UserManagementListComponent
  ],
  providers: [
    UserManagementService,
    // ConfirmationService
  ]
})
export class UserManagementModule { }