import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'auditPipe' })
export class AuditPipe implements PipeTransform {
  transform(value: boolean): string {
    if (value) return "已审核" ;
    if (!value) return "未审核"; 
  }
}

@Pipe({ name: 'caculatedPipe' })
export class CalculatedPipe implements PipeTransform {
  transform(value: boolean): string {
    if (value) return "已计算" ;
    if (!value) return "未计算"; 
  }
}

@Pipe({ name: 'calculateStatusPipe' })
export class CalculateStatusPipe implements PipeTransform {
  transform(value: boolean): string {
    if (value) return "成功" ;
    if (!value) return "失败"; 
  }
}

@Pipe({ name: 'userStatusPipe' })
export class UserStatusPipe implements PipeTransform {
  transform(value: boolean): string {
    if (value) return "已激活" ;
    if (!value) return "未激活"; 
  }
}
  
