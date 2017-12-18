import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";

import {AuditPipe, CalculatedPipe, CalculateStatusPipe, UserStatusPipe} from "./pipes";

@NgModule({
  declarations:[AuditPipe, CalculatedPipe, CalculateStatusPipe, UserStatusPipe],
  imports:[CommonModule],
  exports:[AuditPipe, CalculatedPipe, CalculateStatusPipe, UserStatusPipe]
})

export class MainPipe{}