import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SettingsService } from '@core/services/settings.service';

import { NzMessageService } from 'ng-zorro-antd';

import { AuthenticationService } from '../../../services/login.service';

@Component({
  selector: 'app-pages-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  valForm: FormGroup;

  waiting = false;
  button_label = "登录";

  invalidlogin = false;

  constructor(public settings: SettingsService, private authenticationService: AuthenticationService, fb: FormBuilder, private router: Router, private msg: NzMessageService) {
    this.valForm = fb.group({
      username: [null, Validators.compose([Validators.required]), ],
      password: [null, Validators.required],
      remember_me: [null]
    });
  }

  submit() {
    this.waiting = true
    this.button_label = "登录中..."
    this.invalidlogin = false
    // tslint:disable-next-line:forin
    for (const i in this.valForm.controls) {
      this.valForm.controls[i].markAsDirty();
    }
    if (this.valForm.valid) {
      this.authenticationService.login(this.valForm.value)
			  .subscribe(result => {
        this.waiting = false
        this.button_label = "登录"
			  if (result === true) {
				// login successful
          console.log(localStorage.getItem('currentUsername'));
          this.router.navigate(['layout']);
			  } else if (result === false) {
          this.invalidlogin = true
        }
			  }, 
			  err => { 
          this.msg.error(err);
          this.waiting = false
          this.button_label = "登录"
          this.invalidlogin = false
				  });

      // this.router.navigate(['layout']);
    }
  }

  onChange(){
    this.invalidlogin = false
  }


}
