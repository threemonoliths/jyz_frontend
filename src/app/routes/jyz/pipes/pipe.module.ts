import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";

import {AuditPipe, CalculatedPipe, CalculateStatusPipe} from "./pipes";

@NgModule({
  declarations:[AuditPipe, CalculatedPipe, CalculateStatusPipe],
  imports:[CommonModule],
  exports:[AuditPipe, CalculatedPipe, CalculateStatusPipe]
})

export class MainPipe{}