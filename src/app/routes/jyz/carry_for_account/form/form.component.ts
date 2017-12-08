import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { CarryForAccountService } from '../../../../services/carry_for_account.service';
import { CarryForAccount } from '../../../../domains/carry_for_account.domain'; 
import { GlobalService } from '../../../../services/global.service';
import { stringToDate} from '../../../../utils/utils';

@Component({
    selector: 'carry_for_account-form',
    templateUrl: './form.component.html'
})
export class CarryForAccountFormComponent implements OnInit {
    editIndex = -1;
    editObj = {};
    form: FormGroup;
    title = '创建销售油品提用表';
    breadcrumbItem = {label: "销售油品提用表", routerLink: "/layout/content/carry_for_account/form"}
    caccount: CarryForAccount;
    editable = true;
    // 自定义验证器，验证失败时，需要手工添加class：has-error
    operator_error = ''

    constructor(private fb: FormBuilder, private router: Router, private carryForAccountService: CarryForAccountService, 
                private globalService: GlobalService, private msg: NzMessageService) {}

    ngOnInit() {
        let op = this.carryForAccountService.formOperation;
        if (op == 'create') this.initCreate();
        if (op == 'update') this.initUpdate();
        if (op == 'audit') this.initAudit();
        if (op == 'show') this.initShow();
        console.log(this.caccount)
        this.form = this.fb.group({
            companyname: [this.caccount? this.caccount.companyname : '', [Validators.required]],
            date: [this.caccount? stringToDate(this.caccount.date) : '', [Validators.required]],
            responsibleperson: [this.caccount? this.caccount.responsibleperson : '', [Validators.required]],
            operator : [this.caccount? this.caccount.operator : '', [Validators.required]],
           
            audited : [this.caccount? this.caccount.audited : '未审核'],
            audit_time : [this.caccount? this.caccount.audit_time : ''],
            audit_user : [this.caccount? this.caccount.audit_user : ''],
            create_user : [this.caccount? this.caccount.create_user : ''],
            details: this.fb.array([])
        });

        if ((op == 'update') || (op=='audit'|| (op=='show'))){
        this.caccount.details? this.caccount.details.forEach(i => {
            const field = this.createDetail();
            field.patchValue(i);
            this.details.push(field);
        }) : console.log("tihs caccount has no details.");}
    }

    createDetail(): FormGroup {
        return this.fb.group({
            stockcompany: [ null, [ Validators.required ] ],
            variety: [ null, [ Validators.required ] ],
            lastt: [ null, [ Validators.required , this.validateNumber.bind(this)] ],
            lastl: [ null, [ Validators.required, this.validateNumber.bind(this)] ],
            stockt: [ null, [ Validators.required , this.validateNumber.bind(this)] ],
            stockl: [ null, [ Validators.required, this.validateNumber.bind(this)] ],
            monthpickupt: [ null, [ Validators.required , this.validateNumber.bind(this)] ],
            monthpickupl: [ null, [ Validators.required, this.validateNumber.bind(this)] ],
            monthstockt: [ null, [ Validators.required, this.validateNumber.bind(this)] ],
            monthstockl: [ null, [ Validators.required, this.validateNumber.bind(this)] ],
        });
    }

    //#region get form fields
    get companyname() { return this.form.controls.companyname; }
    get date() { return this.form.controls.date; }
    get responsibleperson() { return this.form.controls.responsibleperson; }
    get operator() { return this.form.controls.operator; }
    get partya() { return this.form.controls.partya; }
    get partyb() { return this.form.controls.partyb; }
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
        for (const i in this.form.controls) {
          this.form.controls[ i ].markAsDirty();
        }
        if (this.form.invalid) return ;
        if (this.form.valid) {
            let op = this.carryForAccountService.formOperation;
            if (op == 'create') this.carryForAccountService.add(this.form.value).then(resp => {
                if (resp.error) { 
                    this.msg.error(resp.error);
                } else {
                    this.msg.success('创建销售油品提用表 ' + resp.companyname + ' 成功！');
                }
                console.log(resp);this.goBack()}).catch(error => this.msg.error(error));
            if (op == 'update') this.carryForAccountService.update(this.caccount.id, this.form.value).then(resp => {
                if (resp.error) { 
                    this.msg.error(resp.error);
                } else {
                    this.msg.success('更新销售油品提用表 ' + resp.companyname + ' 成功！');
                }
                this.goBack();}).catch(error => this.msg.error(error));
            if (op == 'audit') this.carryForAccountService.audit(this.caccount.id).then(resp => {
                if (resp.error) { 
                    this.msg.error(resp.error);
                } else {
                    this.msg.success('审核销售油品提用表 ' + resp.companyname + ' 成功！');
                }
                console.log(resp.error);
                if (resp.error) this.msg.error(resp.error);
                this.goBack();}).catch(error => this.msg.error(error));
        }      
    }

    goBack() {
        this.router.navigateByUrl('/layout/content/carry_for_account/page');
    }

    initCreate() {
        this.title = '创建销售油品提用表';
        this.breadcrumbItem = {label: this.title, routerLink: "/layout/content/carry_for_account/form"};
        this.globalService.addBreadcrumbItem(this.breadcrumbItem);
    }

    initUpdate() {
        this.title = '修改销售油品提用表';
        this.caccount = this.carryForAccountService.updateContract;
    }

    initAudit() {
        this.title = '审核销售油品提用表';
        this.caccount = this.carryForAccountService.updateContract;
    }

    initShow() {
        this.title = '查看销售油品提用表';
        this.editable = false;
        this.caccount = this.carryForAccountService.updateContract;
    }

    //合同额数字验证
    validateNumber(c: FormControl) {
        if (c.value > 0) { 
            this.operator_error='';
        } else if(c.touched || c.dirty) {
            this.operator_error='has-error';
        }
        return c.value > 0 ? null : {validateNumber: true}
    };
   
}
