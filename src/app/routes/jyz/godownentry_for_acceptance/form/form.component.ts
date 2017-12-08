import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';

import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';

import { GodownentryForAcceptanceService } from '../../../../services/godownentry_for_acceptance.service';
import { GodownentryForAcceptance } from '../../../../domains/godownentry_for_acceptance.domain'; 
import { GlobalService } from '../../../../services/global.service';

import { stringToDate} from '../../../../utils/utils';

@Component({
    selector: 'godownentry_for_acceptance-form',
    templateUrl: './form.component.html'
})
export class GodownentryForAcceptanceFormComponent implements OnInit {
    editIndex = -1;
    editObj = {};
    form: FormGroup;
    title = '创建油品入库检验单';
    breadcrumbItem = {label: "油品入库", routerLink: "/layout/content/godownentry_for_acceptance/form"}
    godownentry: GodownentryForAcceptance;
    editable = true;

    // 自定义验证器，验证失败时，需要手工添加class：has-error
    amout_error = ''
     constructor(private fb: FormBuilder, private router: Router, private godownentryForAcceptanceService: GodownentryForAcceptanceService, 
                private globalService: GlobalService, private msg: NzMessageService) {}

    ngOnInit() {
        let op = this.godownentryForAcceptanceService.formOperation;
        if (op == 'create') this.initCreate();
        if (op == 'update') this.initUpdate();
        if (op == 'audit') this.initAudit();
        if (op == 'show') this.initShow();
        console.log(this.godownentry)
        this.form = this.fb.group({
            bno: [this.godownentry? this.godownentry.bno : '', [Validators.required, Validators.minLength(4)]],
            supplier: [this.godownentry? this.godownentry.supplier : '', [Validators.required]],
            cno: [this.godownentry? this.godownentry.cno : '', [Validators.required,Validators.minLength(4)]],
            buyer : [this.godownentry? this.godownentry.buyer : '', [Validators.required]],
            examiner : [this.godownentry? this.godownentry.examiner : '', [Validators.required]],
            accountingstaff : [this.godownentry? this.godownentry.accountingstaff : '', [Validators.required]],

            audited : [this.godownentry? this.godownentry.audited : '未审核'],
            audit_time : [this.godownentry? this.godownentry.audit_time : ''],
            audit_user : [this.godownentry? this.godownentry.audit_user : ''],
            create_user : [this.godownentry? this.godownentry.create_user : ''],

            details: this.fb.array([])
        });
        if ((op == 'update') || (op=='audit'|| (op=='show'))){
        this.godownentry.details? this.godownentry.details.forEach(i => {
            const field = this.createDetail();
            field.patchValue(i);
            this.details.push(field);
        }) : console.log("tihs godownentry has no details.");}

    }

    createDetail(): FormGroup {
        return this.fb.group({
            oilname: [ null, [ Validators.required ] ],
            planquantity: [ null, [ Validators.required , this.validateNumber.bind(this)] ],
            realquantity: [null, [ Validators.required , this.validateNumber.bind(this)] ],
            stockplace: [ null, [ Validators.required] ],
            comment: [ null, [ Validators.required ] ],
            price: [ null, [ Validators.required, this.validateNumber.bind(this)] ],
            totalprice: [ 0, [ Validators.required ] ]
        });
    }

    //#region get form fields
    get bno() { return this.form.controls.bno; }
    get supplier() { return this.form.controls.supplier; }
    get cno() { return this.form.controls.cno; }
    get buyer() { return this.form.controls.buyer; }
    get examiner() { return this.form.controls.examiner; }
    get accountingstaff() { return this.form.controls.accountingstaff; }
    get audited() { return this.form.controls.audited; }
    get audit_time() { return this.form.controls.audit_time; }
    get audit_user() { return this.form.controls.audit_user; }
    get create_user() { return this.form.controls.create_user; }

    get details() { return this.form.controls.details as FormArray; }
    //#endregion

    add() {
        this.details.push(this.createDetail());
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
        if (this.details.at(index).invalid) return;
        let total = this.details.at(index)['controls']['price'].value * this.details.at(index)['controls']['realquantity'].value
        this.details.at(index)['controls']['totalprice'].setValue(total)
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
         for (const i in this.form.controls) {
          this.form.controls[ i ].markAsDirty();
        }
        if (this.form.invalid) return ;
        if (this.form.valid) {
            let op = this.godownentryForAcceptanceService.formOperation;
            if (op == 'create') this.godownentryForAcceptanceService.add(this.form.value).then(resp => {
                if (resp.error) { 
                    this.msg.error(resp.error);
                } else {
                    this.msg.success('创建油品入库单 ' + resp.bno + ' 成功！');
                }
                console.log(resp);this.goBack()}).catch(error => this.msg.error(error));
            if (op == 'update') this.godownentryForAcceptanceService.update(this.godownentry.id, this.form.value).then(resp => {
                if (resp.error) { 
                    this.msg.error(resp.error);
                } else {
                    this.msg.success('更新油品入库单 ' + resp.bno + ' 成功！');
                }
                this.goBack();}).catch(error => this.msg.error(error));
            if (op == 'audit') this.godownentryForAcceptanceService.audit(this.godownentry.id).then(resp => {
                if (resp.error) { 
                    this.msg.error(resp.error);
                } else {
                    this.msg.success('审核油品入库单 ' + resp.bno + ' 成功！');
                }
                console.log(resp.error);
                if (resp.error) this.msg.error(resp.error);
                this.goBack();}).catch(error => this.msg.error(error));
        }
        
    }

    goBack() {
        this.router.navigateByUrl('/layout/content/godownentry_for_acceptance/page');
    }

    initCreate() {
        this.title = '创建油品入库单';
        this.breadcrumbItem = {label: this.title, routerLink: "/layout/content/godownentry_for_acceptance/form"};
        this.globalService.addBreadcrumbItem(this.breadcrumbItem);
    }

    initUpdate() {
        this.title = '修改油品入库单';
        this.godownentry = this.godownentryForAcceptanceService.updateGodownentry;
    }

    initAudit() {
        this.title = '审核油品入库单';
        this.godownentry = this.godownentryForAcceptanceService.updateGodownentry;
    }

    initShow() {
        this.title = '查看油品入库单';
        this.editable = false;
        this.godownentry = this.godownentryForAcceptanceService.updateGodownentry;
    }

    //数量数字验证
    validateNumber(c: FormControl) {
        if (c.value > 0) { 
            this.amout_error='';
        } else if(c.touched || c.dirty) {
            this.amout_error='has-error';
        }
        return c.value > 0 ? null : {validateNumber: true}
    };

    // 自定义validator验证失败需调用该函数，为元素添加has-error类以显示红色高亮样式
//     custom_validator() {
//         console.log("_______________________");
// console.log(this.form.controls['planquantity']);
//         if (!this.form.controls['planquantity'].valid) { this.amout_error = 'has-error' }
//     }

}
