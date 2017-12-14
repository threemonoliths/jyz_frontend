import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'auditPipe' })
export class AuditPipe implements PipeTransform {
  transform(value: boolean): string {
    if (value) return "已审核" ;
    if (!value) return "未审核"; 
  }
  
  
} 