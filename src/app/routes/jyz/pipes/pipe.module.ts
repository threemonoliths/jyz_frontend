import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";

import {AuditPipe, CalculatedPipe, CalculateStatusPipe, UserStatusPipe, PermissionPipe} from "./pipes";

@NgModule({
  declarations:[AuditPipe, CalculatedPipe, CalculateStatusPipe, UserStatusPipe, PermissionPipe],
  imports:[CommonModule],
  exports:[AuditPipe, CalculatedPipe, CalculateStatusPipe, UserStatusPipe, PermissionPipe]
})

export class MainPipe{}