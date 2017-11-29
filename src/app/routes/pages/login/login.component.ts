import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SettingsService } from '@core/services/settings.service';

import { AuthenticationService } from '../../../services/login.service';

@Component({
  selector: 'app-pages-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  valForm: FormGroup;

  constructor(public settings: SettingsService, private authenticationService: AuthenticationService, fb: FormBuilder, private router: Router) {
    this.valForm = fb.group({
      username: [null, Validators.compose([Validators.required])],
      password: [null, Validators.required],
      remember_me: [null]
    });
  }

  submit() {
    // tslint:disable-next-line:forin
    for (const i in this.valForm.controls) {
      this.valForm.controls[i].markAsDirty();
    }
    if (this.valForm.valid) {
      this.authenticationService.login(this.valForm.value)
			  .subscribe(result => {
			  if (result === true) {
				// login successful
          console.log(localStorage.getItem('currentUsername'));
          this.router.navigate(['layout']);
			  } 
			  }, 
			  err => { 
					if (err.status===401){
						// this.error = "用户名或密码错误！";
						// this.loading=false;
					} 
					else if (err.status===400){
						// this.error = "HTTP请求错误！";
						// this.loading=false;
					}
					else {
						// this.error = "无法连接服务器，请检查网络与服务器是否正常！";
						// this.loading=false;
					}
				  });

      // this.router.navigate(['layout']);
    }
  }
}
