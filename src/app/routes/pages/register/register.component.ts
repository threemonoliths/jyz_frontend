import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators ,AbstractControl} from '@angular/forms';
import { SettingsService } from '@core/services/settings.service';
import { NzMessageService } from 'ng-zorro-antd';
//import { RegisterService } from '../../../services/register.service';

@Component({
  selector: 'app-pages-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  valForm: FormGroup;

  constructor(public settings: SettingsService, private msg: NzMessageService,/* private registerService: RegisterService, */ fb: FormBuilder, private router: Router) {
    this.valForm = fb.group({
      username: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required, Validators.minLength(6)])], 
      agreed: [null, Validators.required]}
    );

  }

   submit() {
    for (const i in this.valForm.controls) {
      this.valForm.controls[i].markAsDirty();
    }
    if (this.valForm.valid) {
      console.log('Valid!');
      console.log(this.valForm.value);
      this.msg.success('注册成功！');
      this.router.navigate(['login']);
    }
  }
 
  /*  submit() {
    // tslint:disable-next-line:forin
    for (const i in this.valForm.controls) {
      this.valForm.controls[i].markAsDirty();
    }
    if (this.valForm.valid) {
      this.registerService.register(this.valForm.value)
			  .then(result => {
			  if (result === true) {
           this.msg.success('注册成功！');
           this.router.navigate(['login']);
			  } 
			  }, 
			  err => { 
				  });
    }
  } */
}
