import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { SettingsService } from '@core/services/settings.service';


@Component({
  selector   : 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {

    username=""
    email=""

    constructor(public settings: SettingsService, public msgSrv: NzMessageService, private router: Router) {
    }

    ngOnInit() {
      this.username = localStorage.getItem("username")
      this.email = localStorage.getItem("email")
    }

    logout() {
      localStorage.clear()
      this.router.navigate(['login']);
    }
}
