import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';

import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';

import { UserManagementService } from '../../../../services/user_management.service';
import { UserManagement } from '../../../../domains/user_management.domain'; 
import { GlobalService } from '../../../../services/global.service';

import { stringToDate} from '../../../../utils/utils';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
    selector: 'user_management-form',
    templateUrl: './form.component.html' 
})
export class UserManagementFormComponent implements OnInit {
    editIndex = -1;
    editObj = {};

    form: FormGroup;


    title = '创建用户';
    breadcrumbItem = {label: "用户", routerLink: "/layout/content/user_management/form"}

    user_management: UserManagement;


    editable = true;
    // ,{value:0b00000010, label:"公有权限2"},{value:0b00000001, label:"公有权限1"}
    perList: any[] =  [{value:0b00000111,label: "查看表单"},{value: 0b00001011,label: "添加表单"},{value: 0b00010011,label: "修改表单"},{value: 0b00100011,label: "审核表单"},{value: 0b01000011,label: "用户管理"},{value: 0b10000011,label: "系统管理"}]
    // 自定义验证器，验证失败时，需要手工添加class：has-error
    direction: any[]=[];
    selectedOption : any[]=[];
    location;
  
     constructor(private fb: FormBuilder, private router: Router, private UserManagementService: UserManagementService, 
                private globalService: GlobalService, private msg: NzMessageService) {}

              
    ngOnInit() {
        let op = this.UserManagementService.formOperation;
        if (op == 'create') this.initCreate();
        if (op == 'update') this.initUpdate();
        if (op == 'show') this.initShow();
        this.form = this.fb.group({
           
            email : [this.user_management? this.user_management.email : ''],
            fullname : [this.user_management? this.user_management.fullname : ''],
            position : [this.user_management? this.user_management.position : ''],
            permissions : [this.user_management? this.user_management.permissions : ''],        
        });
        // 修改权限
      var sum=0; 
      var adj; 
      var  perm=this.form.value.permissions.toString(2).split("").reverse().join("");
      for(var i=0;i<8;i++){
        this.location= perm.indexOf('1');
        if(this.location==-1)
            break;
        if(i>=2){
        sum=sum+this.location+1; 
        this.selectedOption.push(this.perList[sum-1].value);  
        }
        
       perm= perm.substring(this.location+1); 
      }
      setTimeout(_ => {
        this.perList 
      }, 300);
      setTimeout(_ => {
        this.selectedOption;
      }, 1000);
    
    }


    //#region get form fields
    get email() { return this.form.controls.email; }
    get fullname() { return this.form.controls.fullname; }
    get position() { return this.form.controls.position; }
    get permissions() { return this.form.controls.permissions; }
    

    _submitForm() {
        // 将权限按位取并，赋值
        var s=0b00000000;
        for(var pers of this.form.controls['permissions'].value){
           s=s|parseInt(pers,10);
      }
        this.form.controls['permissions'].setValue(s.toString());

        for (const i in this.form.controls) {
          this.form.controls[ i ].markAsDirty();
        }
        if (this.form.invalid) return ;
        if (this.form.valid) {
            let op = this.UserManagementService.formOperation;
            if (op == 'create') this.UserManagementService.add(this.form.value).then(resp => {
                if (resp.error) { 
                    this.msg.error(resp.error);
                } else {
                    this.msg.success('增加用户 ' + resp.name + ' 成功！');
                }
                console.log(resp);this.goBack()}).catch(error => this.msg.error(error));
            if (op == 'update') this.UserManagementService.update(this.user_management.id, this.form.value).then(resp => {
                if (resp.error) { 
                    this.msg.error(resp.error);
                } else {
                    this.msg.success('更新用户 ' + resp.name + ' 成功！');
                }
                this.goBack();}).catch(error => this.msg.error(error));
         
        }
        
    }

    goBack() {
        this.router.navigateByUrl('/layout/content/user_management/page');
    }

    initCreate() {
        this.title = '增加用户';
        this.breadcrumbItem = {label: this.title, routerLink: "/layout/content/user_management/form"};
        this.globalService.addBreadcrumbItem(this.breadcrumbItem);
    }

    initUpdate() {
        this.title = '修改用户';
        this.user_management = this.UserManagementService.updateUserManagement;
    }

    

    initShow() {
        this.title = '查看用户'; 
        this.editable = false;
        this.user_management = this.UserManagementService.updateUserManagement;
    } 

}
