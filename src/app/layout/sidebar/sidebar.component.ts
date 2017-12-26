import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { SettingsService } from '@core/services/settings.service';

import { UserManagementService } from '../../services/user_management.service';


@Component({
  selector   : 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {

    username=""
    email=""
    avatar="./assets/img/default.png"

    constructor(public settings: SettingsService, public msgSrv: NzMessageService,
                private router: Router, private userService: UserManagementService) {
    }

    ngOnInit() {
      this.username = localStorage.getItem("username")
      this.email = localStorage.getItem("email")
      this.avatar = localStorage.getItem("avatar") ? localStorage.getItem("avatar"): this.avatar
      console.log(this.avatar)
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
