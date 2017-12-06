import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,FormControl, Validators, FormArray } from '@angular/forms';

import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';

import { MeteringForReturnService } from '../../../../services/metering_for_return.service';
import { MeteringForReturn } from '../../../../domains/metering_for_return.domain'; 
import { GlobalService } from '../../../../services/global.service';

import { stringToDate} from '../../../../utils/utils';

@Component({
    selector: 'metering_for_return-form',
    templateUrl: './form.component.html'
})
export class MeteringForReturnFormComponent implements OnInit {
    editIndex = -1;
    editObj = {};

    form: FormGroup;

    title = '创建油品回罐单';
    breadcrumbItem = {label: "油品回罐单", routerLink: "/layout/content/metering_for_return/form"}

    metering: MeteringForReturn;

    
    editable = true;

    // 自定义验证器，验证失败时，需要手工添加class：has-error
    amount_error = ''

    constructor(private fb: FormBuilder, private router: Router, private meteringForReturnService: MeteringForReturnService, 
                private globalService: GlobalService, private msg: NzMessageService) {}

    ngOnInit() {
        let op = this.meteringForReturnService.formOperation;
        if (op == 'create') this.initCreate();
        if (op == 'update') this.initUpdate();
        if (op == 'audit') this.initAudit();
        if (op == 'show') this.initShow();
        this.form = this.fb.group({
            billno: [this.metering? this.metering.billno : '', [Validators.required, Validators.minLength(4)]],
            billdate: [this.metering? stringToDate(this.metering.billdate) : '', [Validators.required]],
            stockman: [this.metering? this.metering.stockman : '', [Validators.required]],
            accountingclerk : [this.metering? this.metering.accountingclerk : '', [Validators.required]],
            comment : [this.metering? this.metering.comment : '', [Validators.required]],
            audited : [this.metering? this.metering.audited : '未审核'],
            audit_time : [this.metering? this.metering.audit_time : ''],
            audit_user : [this.metering? this.metering.audit_user : ''],
            create_user : [this.metering? this.metering.create_user : ''],

            details: this.fb.array([])
        });
        if ((op == 'update') || (op=='audit'|| (op=='show'))){
        this.metering.details? this.metering.details.forEach(i => {
            const field = this.createUser();
            field.patchValue(i);
            console.log(field);
            this.details.push(field);
        }) : console.log("tihs metering has no details.");}
    }

    createUser(): FormGroup {
        return this.fb.group({
            wagonno: [ null, [ Validators.required ] ],
            cardno: [ null, [ Validators.required ] ],
            oilname: [ null, [ Validators.required ] ],
            unit: [ null, [ Validators.required ] ],
            quantity: [ null, [ Validators.required , this.validateNumber.bind(this)] ],
            stockplace: [ null, [ Validators.required, this.validateNumber.bind(this) ] ],
            comment: [ null, [ Validators.required ] ]
        });
    }

    //#region get form fields
    get billno() { return this.form.controls.billno; }
    get billdate() { return this.form.controls.billdate; }
    get stockman() { return this.form.controls.stockman; }
    get accountingclerk() { return this.form.controls.accountingclerk; }
    get comment() { return this.form.controls.comment; }
    get audited() { return this.form.controls.audited; }
    get audit_time() { return this.form.controls.audit_time; }
    get audit_user() { return this.form.controls.audit_user; }
    get create_user() { return this.form.controls.create_user; }

    get details() { return this.form.controls.details as FormArray; }
    //#endregion

    add() {
        this.details.push(this.createUser());
        this.edit(this.details.length - 1);
    }

    del(index: number) {
        this.details.removeAt(index);
    }

    edit(index: number) {
        if (this.editIndex !== -1 && this.editObj) {
            this.details.at(this.editIndex).patchValue(this.editObj);
        }
        this.editObj = { ...this.details.at(index).value };
        this.editIndex = index;
    }

    save(index: number) {
        this.details.at(index).markAsDirty();
        if (this.details.at(index).invalid) return ;
        this.editIndex = -1;
    }

    cancel(index: number) {
        if (!this.details.at(index).value.key) {
            this.del(index);
        } else {
            this.details.at(index).patchValue(this.editObj);
        }
        this.editIndex = -1;
    }

     _submitForm() {
        //this.msg.success(`Copied Success!`);
        //this.custom_validator();

        for (const i in this.form.controls) {
          this.form.controls[ i ].markAsDirty();
        }
        if (this.form.invalid) return ;
        if (this.form.valid) {
            let op = this.meteringForReturnService.formOperation;
            if (op == 'create') this.meteringForReturnService.add(this.form.value).then(resp => {
                if (resp.error) { 
                    this.msg.error(resp.error);
                } else {
                    this.msg.success('创建油品回罐单' + resp.billno + ' 成功！');
                }
                console.log(resp);this.goBack()}).catch(error => this.msg.error(error));
            if (op == 'update') this.meteringForReturnService.update(this.metering.id, this.form.value).then(resp => {
                if (resp.error) { 
                    this.msg.error(resp.error);
                } else {
                    this.msg.success('更新油品回罐单 ' + resp.billno + ' 成功！');
                }
                this.goBack();}).catch(error => this.msg.error(error));
            if (op == 'audit') this.meteringForReturnService.audit(this.metering.id).then(resp => {
                if (resp.error) { 
                    this.msg.error(resp.error);
                } else {
                    this.msg.success('审核油品回罐单' + resp.billno + ' 成功！');
                }
                console.log(resp.error);
                if (resp.error) this.msg.error(resp.error);
                this.goBack();}).catch(error => this.msg.error(error));
        }
        
    }


    goBack() {
        this.router.navigateByUrl('/layout/content/metering_for_return/page');
    }

    initCreate() {
        this.title = '创建油品回罐单';
        this.breadcrumbItem = {label: this.title, routerLink: "/layout/content/metering_for_return/form"};
        this.globalService.addBreadcrumbItem(this.breadcrumbItem);
    }

    initUpdate() {
        this.title = '修改油品回罐单';
        this.metering = this.meteringForReturnService.updateMetering;
    }

    initAudit() {
        this.title = '审核油品回罐单';
        this.metering = this.meteringForReturnService.updateMetering;
    }

    initShow() {
        this.title = '查看油品回罐单';
        this.editable = false;
        this.metering = this.meteringForReturnService.updateMetering;
    }

    //合同额数字验证
    validateNumber(c: FormControl) {
        if (c.value > 0) { 
            this.amount_error='';
        } else if(c.touched || c.dirty) {
            this.amount_error='has-error';
        }
        return c.value> 0 ? null : {validateNumber: true}
    };

    // 自定义validator验证失败需调用该函数，为元素添加has-error类以显示红色高亮样式
    custom_validator() {
        if (!this.form.controls['stockman'].valid) { this.amount_error = 'has-error' }
    }


}
