import { Component,OnInit } from '@angular/core';
import { SettingsService } from '@core/services/settings.service';

import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';


 import { UserManagementService } from '../../../services/user_management.service';
@Component({
    selector: 'header-user',
    template: `
    <nz-dropdown nzPlacement="bottomRight">
        <div class="item d-flex align-items-center px-sm" nz-dropdown>
            <nz-avatar [nzSrc]="settings.user.avatar" nzSize="small" class="mr-sm"></nz-avatar>
            {{settings.user.name}}
        </div>
        <div nz-menu class="width-sm">
           
             <div nz-menu-item [nzDisable]="true">
            
            
              <li nz-menu-item (click)="change_profile()">{{ '个人资料' | translate }}</li>
            <li nz-menu-item (click)="change_password()">{{ '修改密码' | translate }}</li>
            <li nz-menu-item (click)="change_avatar()">{{ '上传头像' | translate }}</li>
            <li nz-menu-item (click)="logout()">{{ '退出登录'}}</li>
             </div>
           
    
           
        </div>
    </nz-dropdown>
    `

     
    
})
export class HeaderUserComponent {
    
    constructor(public settings: SettingsService, public msgSrv: NzMessageService,
                private router: Router, private userService: UserManagementService) {
    }
     logout() {
      localStorage.clear()
      this.router.navigate(['login']);
    }

    change_password(){
      this.router.navigate(['layout/content/change_password']);
    }

    change_avatar(){
      this.router.navigate(['layout/content/change_avatar']);
    }

    change_profile(){
      console.log(localStorage.getItem("username"))

      this.userService.getByName(localStorage.getItem("username"))
        .then(result => {console.log(result);if (result.id) this.userService.updateUserManagement = result;})
        .then(result => this.router.navigate(['layout/content/change_profile']))
        .catch(error => this.msgSrv.error(error))
        
    }
}
