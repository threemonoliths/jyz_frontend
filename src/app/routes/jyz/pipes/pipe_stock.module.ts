import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";

import {Cal_StatusPipe} from "./pipe_stock";

@NgModule({
  declarations:[Cal_StatusPipe],
  imports:[CommonModule],
  exports:[Cal_StatusPipe]
})

export class Main1Pipe{}