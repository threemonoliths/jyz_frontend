import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormControl } from '@angular/forms';
import { TransferService } from './transfer.service';

import { Observable } from 'rxjs/Observable';
import { ArrayObservable } from 'rxjs/observable/ArrayObservable';
import { map, delay, debounceTime } from 'rxjs/operators';

import { AuthenticationService } from '../../../services/login.service';
import { UserManagementService } from '../../../services/user_management.service';

import { NzMessageService } from 'ng-zorro-antd';

@Component({
    selector: 'app-step1',
    template: `
    <form nz-form [formGroup]="form" (ngSubmit)="_submitForm()">
        
        <div nz-form-item nz-row>
            <div nz-form-label nz-col [nzSm]="4">
                <label for="username" nz-form-item-required>用户名</label>
            </div>
            <div nz-form-control nz-col [nzSm]="20" nzHasFeedback [nzValidateStatus]="username">
                <nz-input formControlName="username" nzSize="large" [nzId]="'username'"></nz-input>
                <ng-container *ngIf="username.dirty || username.touched">
                    <p nz-form-explain *ngIf="username.errors?.required">请输入用户名</p>
                    <p nz-form-explain *ngIf="username.errors?.minlength">至少4个字符以上</p>
                    <p nz-form-explain *ngIf="username.errors?.checked">用户名已存在</p>
                </ng-container>
                
            </div>
            
        </div>


        <div nz-form-item nz-row class="border-top-1 mt-lg pt-lg">
        <div nz-form-label nz-col [nzSm]="4">
            <label for="password" nz-form-item-required>密码</label>
        </div>
        <div nz-form-control nz-col [nzSm]="20" nzHasFeedback [nzValidateStatus]="password">
            <nz-input formControlName="password" nzSize="large" nzType="password" nzId="password"></nz-input>
            <ng-container *ngIf="password.dirty || password.touched">
                <p nz-form-explain *ngIf="password.errors?.required">请输入密码</p>
                <p nz-form-explain *ngIf="password.errors?.minlength">至少6位数以上</p>
                
            </ng-container>
        </div>
        </div>

        <div nz-form-item nz-row>
        <div nz-form-label nz-col [nzSm]="4">
            <label for="repassword" nz-form-item-required>确认密码</label>
        </div>
        <div nz-form-control nz-col [nzSm]="20" nzHasFeedback [nzValidateStatus]="repassword">
            <nz-input formControlName="repassword" nzSize="large" nzType="password" nzId="repassword"></nz-input>
            <ng-container *ngIf="repassword.dirty || repassword.touched">
                <p nz-form-explain *ngIf="repassword.errors?.required">请输入密码</p>
                <p nz-form-explain *ngIf="repassword.errors?.minlength">至少6位数以上</p>
                <p nz-form-explain *ngIf="repassword.errors?.confirm">密码不匹配</p>
            </ng-container>
        </div>
        </div>

        <div nz-form-item nz-row class="border-top-1 mt-lg pt-lg">
            <div nz-form-label nz-col [nzSm]="4">
                <label for="email" nz-form-item-required>电子邮箱</label>
            </div>
            <div nz-form-control nz-col [nzSm]="20" nzHasFeedback [nzValidateStatus]="email">
                <nz-input formControlName="email" nzSize="large" [nzId]="'email'"></nz-input>
                <ng-container *ngIf="email.dirty || email.touched">
                    <p nz-form-explain *ngIf="email.errors?.required">请输入电子邮箱</p>
                    <p nz-form-explain *ngIf="email.errors?.email && email.value">邮箱格式不正确</p>
                </ng-container>
            </div>
        </div>

        <div nz-form-item nz-row>
            <div nz-form-label nz-col [nzSm]="4">
                <label for="fullname" nz-form-item-required>真实姓名</label>
            </div>
            <div nz-form-control nz-col [nzSm]="20" nzHasFeedback [nzValidateStatus]="fullname">
                <nz-input formControlName="fullname" nzSize="large" [nzId]="'fullname'"></nz-input>
                <ng-container *ngIf="fullname.dirty || fullname.touched">
                    <p nz-form-explain *ngIf="fullname.errors?.required">请输入真实姓名</p>
                    <p nz-form-explain *ngIf="fullname.errors?.minlength">至少2个字符以上</p>
                </ng-container>
            </div>
        </div>

        <div nz-form-item nz-row>
            <div nz-form-label nz-col [nzSm]="4">
                <label for="position" nz-form-item-required>职位</label>
            </div>
            <div nz-form-control nz-col [nzSm]="20" nzHasFeedback [nzValidateStatus]="position">
                <nz-input formControlName="position" nzSize="large" [nzId]="'position'"></nz-input>
                <ng-container *ngIf="position.dirty || position.touched">
                    <p nz-form-explain *ngIf="position.errors?.required">请输入职位</p>
                    <p nz-form-explain *ngIf="position.errors?.minlength">至少4个字符以上</p>
                </ng-container>
            </div>
        </div>
       
        <div nz-form-item nz-row>
            <div nz-form-control nz-col [nzSpan]="20" [nzOffset]="4">
                <button nz-button [nzType]="'primary'" nzSize="large" [disabled]="form.invalid || waiting"> {{button_label}}</button>
            </div>
        </div>
    </form>
    <div class="border-top-1 mt-lg px-lg text-grey-dark">
        <h3 class="h3 my-md">说明</h3>

        <p class="mb-sm">用户名作为登录账号名称，将不可修改。</p>
 
        <p>请填写正确的电子邮箱地址，否则将无法找回密码。</p>
    </div>
    `,
    providers: [ UserManagementService ]
    
})
export class Step1Component implements OnInit {
    form: FormGroup;

    waiting = false;
    button_label = "确认提交"

    constructor(private fb: FormBuilder, public item: TransferService, 
        private authService: AuthenticationService, private userService: UserManagementService,
        private msg: NzMessageService) {}

    ngOnInit() {
        this.form = this.fb.group({
            

            username: [null, Validators.compose([Validators.required, Validators.minLength(2)]), this.usernameValidator.bind(this)],
            email: [null, Validators.compose([Validators.required, Validators.email])],
            fullname: [null, Validators.compose([Validators.required, Validators.minLength(2)])],
            position: [null, Validators.compose([Validators.required, Validators.minLength(2)])],
            password: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
            repassword: [null, Validators.compose([Validators.required, Validators.minLength(6), this.confirmationValidator])]
            
        });
        this.form.patchValue(this.item);
    }

    //#region get form fields
    get username() { return this.form.controls['username']; }
    get email() { return this.form.controls['email']; }
    get fullname() { return this.form.controls['fullname']; }
    get position() { return this.form.controls['position']; }
    get password() { return this.form.controls['password']; }
    get repassword() { return this.form.controls['repassword']; }
    //#endregion
    _submitForm() {
        //this.item = Object.assign(this.item, this.form.value);
        //++this.item.step;
        this.waiting = true
        this.button_label = "提交中..."
        console.log(this.form.value)
        this.userService.add(this.form.value).then(result => {this.waiting = false; this.button_label = "确认提交";if (result.error) {this.msg.error(result.error);}else{++this.item.step}}).catch(error => console.log(error))
        
    }

    //用户名username异步验证
    usernameValidator = (control: FormControl): Observable<any>  => {
        this.waiting = true
        return control.valueChanges.pipe(
            debounceTime(200),
            map((value) => {
                this.waiting = true
                this.authService.checkUsernameAlreadyExists(control.value)
                .then(result => {
                this.waiting = false
                if (result.id) {control.setErrors({ checked: true, error: true })} else if (!control.value){control.setErrors({ required: true })}  else {control.setErrors(null);};})

                
            })
        )
    }
       
    //却热密码验证
    confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
        if (!control.value) {
            return { required: true };
        } else if (control.value !== this.form.controls['password'].value) {
            return { confirm: true, error: true };
        }
    }
}