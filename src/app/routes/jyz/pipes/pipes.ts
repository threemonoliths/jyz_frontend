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

@Pipe({ name: 'permissionPipe' })
export class PermissionPipe implements PipeTransform {
  transform(value): string {
    console.log("value:"+value)
       var sum= 0;
       var str="";
       var  perList =  [{value:0b00000111,label: "查看表单"},{value: 0b00001011,label: "添加表单"},{value: 0b00010011,label: "修改表单"},{value: 0b00100011,label: "审核表单"},{value: 0b01000011,label: "用户管理"},{value: 0b10000011,label: "系统管理"}]
       var  perm= value.toString(2).split("").reverse().join("");
       for(var i=0; i<8; i++){
       var location= perm.indexOf('1');
        if(location==-1)
            break;
        if(i>=2){
        sum=sum+location+1;
        str +=","+perList[sum-1].label ; 
        }
        perm= perm.substring(location+1);
  }
  if(str.substr(0,1)==',')
  str=str.substr(1);
  return str;
}
}
  
