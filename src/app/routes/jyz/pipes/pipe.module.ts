import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";

import {AuditPipe} from "./pipes";

@NgModule({
  declarations:[AuditPipe],
  imports:[CommonModule],
  exports:[AuditPipe]
})

export class MainPipe{}