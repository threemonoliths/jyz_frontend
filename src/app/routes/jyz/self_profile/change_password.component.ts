import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormControl } from '@angular/forms';

import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { ArrayObservable } from 'rxjs/observable/ArrayObservable';
import { map, delay, debounceTime } from 'rxjs/operators';

import { AuthenticationService } from '../../../services/login.service';
import { UserManagementService } from '../../../services/user_management.service';

import { NzMessageService } from 'ng-zorro-antd';

@Component({
    selector: 'change-password',
    template: `
    <form nz-form [formGroup]="form" (ngSubmit)="_submitForm()">
        <h3 class="text-center" >修改密码</h3> 
        <div nz-form-item nz-row class="border-top-1 mt-lg pt-lg">
        <div nz-form-label nz-col [nzSm]="4" [nzOffset]="5" >
            <label for="oldpassword" nz-form-item-required>旧密码</label>
        </div>
        <div nz-form-control nz-col [nzSm]="7" nzHasFeedback [nzValidateStatus]="oldpassword">
            <nz-input formControlName="oldpassword" nzSize="large" nzType="password" nzId="oldpassword"></nz-input>
            <ng-container *ngIf="oldpassword.dirty || oldpassword.touched">
                <p nz-form-explain *ngIf="oldpassword.errors?.required">请输入旧密码</p>
                <p nz-form-explain *ngIf="oldpassword.errors?.minlength">至少6位数以上</p>
                <p nz-form-explain *ngIf="oldpassword.errors?.checked">无效的密码</p>
            </ng-container>
        </div>
        </div>

        <div nz-form-item nz-row >
        <div nz-form-label nz-col [nzSm]="4" [nzOffset]="5">
            <label for="newpassword" nz-form-item-required>新密码</label>
        </div>
        <div nz-form-control nz-col [nzSm]="7" nzHasFeedback [nzValidateStatus]="newpassword">
            <nz-input formControlName="newpassword" nzSize="large" nzType="password" nzId="newpassword"></nz-input>
            <ng-container *ngIf="newpassword.dirty || newpassword.touched">
                <p nz-form-explain *ngIf="newpassword.errors?.required">请输入新密码</p>
                <p nz-form-explain *ngIf="newpassword.errors?.minlength">至少6位数以上</p>
            </ng-container>
        </div>
        </div>

        <div nz-form-item nz-row>
        <div nz-form-label nz-col [nzSm]="4" [nzOffset]="5">
            <label for="repassword" nz-form-item-required>确认新密码</label>
        </div>
        <div nz-form-control nz-col [nzSm]="7" nzHasFeedback [nzValidateStatus]="repassword">
            <nz-input formControlName="repassword" nzSize="large" nzType="password" nzId="repassword"></nz-input>
            <ng-container *ngIf="repassword.dirty || repassword.touched">
                <p nz-form-explain *ngIf="repassword.errors?.required">请确认新密码</p>
                <p nz-form-explain *ngIf="repassword.errors?.minlength">至少6位数以上</p>
                <p nz-form-explain *ngIf="repassword.errors?.confirm">密码不匹配</p>
            </ng-container>
        </div>
        </div>
   
         <div nz-form-item nz-row>
            <div nz-form-control nz-col [nzSpan]="20" [nzOffset]="11">
                <button nz-button [nzType]="'primary'" nzSize="large" [disabled]="form.invalid || waiting"> {{button_label}}</button>
            </div>
        </div>
    </form>

    `,
    providers: [ UserManagementService ]
    
})
export class ChangePwComponent implements OnInit {
    form: FormGroup;

    waiting = false;
    button_label = "确认提交"

    constructor(private fb: FormBuilder,
        private authService: AuthenticationService, private userService: UserManagementService,
        private msg: NzMessageService, private router: Router) {}

    ngOnInit() {
        this.form = this.fb.group({
            

            oldpassword: [null, Validators.compose([Validators.required, Validators.minLength(6)]), this.passwordValidator.bind(this)],
            newpassword: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
            repassword: [null, Validators.compose([Validators.required, Validators.minLength(6), this.confirmationValidator])]
            
        });
        //this.form.patchValue(this.item);
    }

    //#region get form fields
    get oldpassword() { return this.form.controls['oldpassword']; }
    get newpassword() { return this.form.controls['newpassword']; }
    get repassword() { return this.form.controls['repassword']; }
    //#endregion
    _submitForm() {
        //this.item = Object.assign(this.item, this.form.value);
        //++this.item.step;
        this.waiting = true
        this.button_label = "提交中..."
        console.log(this.form.value)
        this.userService.changePwd(this.form.controls['newpassword'].value)
            .then(result => {this.waiting = false; this.button_label = "确认提交"; this.router.navigateByUrl('/layout/content/dashboard'); this.msg.success('密码已成功修改！'); })
            .catch(error => this.msg.error('修改密码失败，请联系管理员！'))
        
    }

    //用户名username异步验证
    passwordValidator = (control: FormControl): Observable<any>  => {
        this.waiting = true
        return control.valueChanges.pipe(
            debounceTime(300),
            map((value) => {
                this.waiting = true
                this.authService.checkPassword(control.value)
                .then(result => {
                this.waiting = false
                if (result.success) {control.setErrors(null)} else if (!control.value){control.setErrors({ required: true })}  else {control.setErrors({ checked: true, error: true });};})

                
            })
        )
    }
       
    //确认密码验证
    confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
        if (!control.value) {
            return { required: true };
        } else if (control.value !== this.form.controls['newpassword'].value) {
            return { confirm: true, error: true };
        }
    }
}