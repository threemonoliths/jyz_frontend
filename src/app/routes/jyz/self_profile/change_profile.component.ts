import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ArrayObservable } from 'rxjs/observable/ArrayObservable';
import { map, delay, debounceTime } from 'rxjs/operators';

import { AuthenticationService } from '../../../services/login.service';
import { UserManagementService } from '../../../services/user_management.service';

import { NzMessageService } from 'ng-zorro-antd';

import { Bounds, CropperSettings, ImageCropperComponent } from 'ng2-img-cropper';

@Component({
    selector: 'app-step1',
    template: `
    <form nz-form [formGroup]="form" (ngSubmit)="_submitForm()">
        <h3 class="text-center" >个人资料</h3> 
        <div nz-form-item nz-row class="border-top-1 mt-lg pt-lg">
            <div nz-form-label nz-col [nzSm]="4" [nzOffset]="5">
                <label for="email" nz-form-item-required>电子邮箱</label>
            </div>
            <div nz-form-control nz-col [nzSm]="7" nzHasFeedback [nzValidateStatus]="email">
                <nz-input formControlName="email" nzSize="large" [nzId]="'email'" (input)="onChange()"></nz-input>
                <ng-container *ngIf="email.dirty || email.touched">
                    <p nz-form-explain *ngIf="email.errors?.required">请输入电子邮箱</p>
                    <p nz-form-explain *ngIf="email.errors?.email && email.value" >邮箱格式不正确</p>
                    <p nz-form-explain *ngIf="email.errors?.checked && email.value">该邮箱已被占用</p>
                </ng-container>
            </div>
        </div>

        <div nz-form-item nz-row>
            <div nz-form-label nz-col [nzSm]="4" [nzOffset]="5">
                <label for="fullname" nz-form-item-required>真实姓名</label>
            </div>
            <div nz-form-control nz-col [nzSm]="7" nzHasFeedback [nzValidateStatus]="fullname">
                <nz-input formControlName="fullname" nzSize="large" [nzId]="'fullname'"></nz-input>
                <ng-container *ngIf="fullname.dirty || fullname.touched">
                    <p nz-form-explain *ngIf="fullname.errors?.required">请输入真实姓名</p>
                    <p nz-form-explain *ngIf="fullname.errors?.minlength">至少2个字符以上</p>
                </ng-container>
            </div>
        </div>

        <div nz-form-item nz-row>
            <div nz-form-label nz-col [nzSm]="4" [nzOffset]="5">
                <label for="position" nz-form-item-required>职位</label>
            </div>
            <div nz-form-control nz-col [nzSm]="7" nzHasFeedback [nzValidateStatus]="position">
                <nz-input formControlName="position" nzSize="large" [nzId]="'position'"></nz-input>
                <ng-container *ngIf="position.dirty || position.touched">
                    <p nz-form-explain *ngIf="position.errors?.required">请输入职位</p>
                    <p nz-form-explain *ngIf="position.errors?.minlength">至少4个字符以上</p>
                </ng-container>
            </div>
        </div>
       
        <div nz-form-item nz-row>
            <div nz-form-control nz-col [nzSpan]="20" [nzOffset]="11">
                <button nz-button [nzType]="'primary'" nzSize="large" [disabled]="form.invalid || waiting"> {{button_label}}</button>
            </div>
        </div>

    </form>

    `

})
export class ChangeProfileComponent implements OnInit {
    form: FormGroup;

    waiting = false;
    button_label = "确认提交";
    user: any = null;

    constructor(private fb: FormBuilder,
        private authService: AuthenticationService, private userService: UserManagementService,
        private msg: NzMessageService, private router: Router) {}

    ngOnInit() {
        this.user = this.userService.updateUserManagement
        this.form = this.fb.group({

            email: [null, Validators.compose([Validators.required, Validators.email]), this.emailValidator.bind(this)],
            fullname: [null, Validators.compose([Validators.required, Validators.minLength(2)])],
            position: [null, Validators.compose([Validators.required, Validators.minLength(2)])]
  
        });
        // 使用control.valueChanges.pipe的方法做异步验证必须在实例化form之后进行
        this.form.controls['email'].setValue(this.user ? this.user.email : null)
        this.form.controls['fullname'].setValue(this.user ? this.user.fullname : null)
        this.form.controls['position'].setValue(this.user ? this.user.position : null)

        
    }

    //#region get form fields

    get email() { return this.form.controls['email']; }
    get fullname() { return this.form.controls['fullname']; }
    get position() { return this.form.controls['position']; }

    //#endregion
    _submitForm() {

        this.waiting = true
        this.button_label = "提交中..."
        console.log(this.form.value)
        this.userService.update(this.user.id, this.form.value)
            .then(result => {this.waiting = false; 
                             this.button_label = "确认提交";
                             if (result.error) {this.msg.error(result.error);} 
                             else if(result.id) { this.msg.success("用户资料已成功修改！"); this.router.navigateByUrl('/layout/content/dashboard');}})
            .catch(error => console.log(error))
        
    }

    onChange(){
        this.waiting = true
    }

    //邮箱Email异步验证
    emailValidator = (control: FormControl): Observable<any>  => {
       
        return control.valueChanges.pipe(
            debounceTime(200),
            map((value) => {
 
                this.authService.checkEmailAlreadyExists(control.value)
                    .then(result => {
                    this.waiting = false
                    if (result.error) {control.setErrors({ checked: true, error: true })} else if (!control.value){control.setErrors({ required: true })}  else {control.setErrors(null);};})

                
            })
        )
    }   
    
    
    //--------------------头像上传----------------------------//
    name: string;
    data1: any;
    cropperSettings: CropperSettings;

    @ViewChild('cropper', undefined) cropper: ImageCropperComponent;

    initUpload(){
        this.name = 'ng-alain';
        this.cropperSettings = new CropperSettings();

        this.cropperSettings.noFileInput = true;

        this.cropperSettings.width = 200;
        this.cropperSettings.height = 200;

        this.cropperSettings.croppedWidth = 200;
        this.cropperSettings.croppedHeight = 200;

        this.cropperSettings.canvasWidth = 460;
        this.cropperSettings.canvasHeight = 400;

        this.cropperSettings.minWidth = 100;
        this.cropperSettings.minHeight = 100;

        this.cropperSettings.cropperDrawSettings.strokeColor = 'rgba(255,255,255,1)';
        this.cropperSettings.cropperDrawSettings.strokeWidth = 2;

        this.cropperSettings.rounded = false;

        this.data1 = {};
    }

    cropped(bounds: Bounds) {
        console.log(bounds);
    }

    fileChange($event) {
        const image: any = new Image();
        const file: File = $event.target.files[0];
        const myReader: FileReader = new FileReader();
        const that = this;
        myReader.onloadend = (loadEvent: any) => {
            image.src = loadEvent.target.result;
            that.cropper.setImage(image);
        };

        myReader.readAsDataURL(file);
    }
}