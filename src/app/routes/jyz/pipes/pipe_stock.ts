import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'cal_statusPipe' })
export class Cal_StatusPipe implements PipeTransform {
  transform(value: boolean): string {
    if (value) return "已计算" ;
    if (!value) return "未计算"; 
  }
  
  
} 