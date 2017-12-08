import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';

import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';

import { ContractForPurchaseService } from '../../../../services/contract_for_purchase.service';
import { ContractForPurchase } from '../../../../domains/contract_for_purchase.domain'; 
import { GlobalService } from '../../../../services/global.service';

import { stringToDate} from '../../../../utils/utils';

@Component({
    selector: 'contract_for_purchase-form',
    templateUrl: './form.component.html'
})
export class ContractForPurchaseFormComponent implements OnInit {
    editIndex = -1;
    editObj = {};

    form: FormGroup;

    title = '创建采购合同';
    breadcrumbItem = {label: "采购合同", routerLink: "/layout/content/contract_for_purchase/form"}

    contract: ContractForPurchase;


    editable = true;

    // 自定义验证器，验证失败时，需要手工添加class：has-error
    amount_error = ''

    constructor(private fb: FormBuilder, private router: Router, private contractForPurchaseService: ContractForPurchaseService, 
                private globalService: GlobalService, private msg: NzMessageService) {}

    ngOnInit() {
        let op = this.contractForPurchaseService.formOperation;
        if (op == 'create') this.initCreate();
        if (op == 'update') this.initUpdate();
        if (op == 'audit') this.initAudit();
        if (op == 'show') this.initShow();
        console.log(this.contract)
        this.form = this.fb.group({
            cno: [this.contract? this.contract.cno : '', [Validators.required, Validators.minLength(4)]],
            date: [this.contract? stringToDate(this.contract.date) : '', [Validators.required]],
            location: [this.contract? this.contract.location : '', [Validators.required]],
            amount : [this.contract? this.contract.amount : '', [Validators.required, this.validateNumber.bind(this)]],
            partya : [this.contract? this.contract.partya : '', [Validators.required]],
            partyb : [this.contract? this.contract.partyb : '', [Validators.required]],

            audited : [this.contract? this.contract.audited : '未审核'],
            audit_time : [this.contract? this.contract.audit_time : ''],
            audit_user : [this.contract? this.contract.audit_user : ''],
            create_user : [this.contract? this.contract.create_user : ''],

            details: this.fb.array([])
        });
        if ((op == 'update') || (op=='audit'|| (op=='show'))){
        this.contract.details? this.contract.details.forEach(i => {
            const field = this.createDetail();
            field.patchValue(i);
            this.details.push(field);
        }) : console.log("tihs contract has no details.");}

    }

    createDetail(): FormGroup {
        return this.fb.group({
            product: [ null, [ Validators.required ] ],
            model: [ null, [ Validators.required ] ],
            producer: [ null, [ Validators.required ] ],
            amount: [ null, [ Validators.required, this.validateNumber.bind(this)] ],
            unit: [ null, [ Validators.required ] ],
            price: [ null, [ Validators.required, this.validateNumber.bind(this)] ],
            totalprice: [ 0, [ Validators.required ] ]
        });
    }

    //#region get form fields
    get cno() { return this.form.controls.cno; }
    get date() { return this.form.controls.date; }
    get location() { return this.form.controls.location; }
    get amount() { return this.form.controls.amount; }
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
        let total = this.details.at(index)['controls']['price'].value * this.details.at(index)['controls']['amount'].value
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
        this.custom_validator();

        for (const i in this.form.controls) {
          this.form.controls[ i ].markAsDirty();
        }
        if (this.form.invalid) return ;
        if (this.form.valid) {
            let op = this.contractForPurchaseService.formOperation;
            if (op == 'create') this.contractForPurchaseService.add(this.form.value).then(resp => {
                if (resp.error) { 
                    this.msg.error(resp.error);
                } else {
                    this.msg.success('创建采购合同 ' + resp.cno + ' 成功！');
                }
                console.log(resp);this.goBack()}).catch(error => this.msg.error(error));
            if (op == 'update') this.contractForPurchaseService.update(this.contract.id, this.form.value).then(resp => {
                if (resp.error) { 
                    this.msg.error(resp.error);
                } else {
                    this.msg.success('更新采购合同 ' + resp.cno + ' 成功！');
                }
                this.goBack();}).catch(error => this.msg.error(error));
            if (op == 'audit') this.contractForPurchaseService.audit(this.contract.id).then(resp => {
                if (resp.error) { 
                    this.msg.error(resp.error);
                } else {
                    this.msg.success('审核采购合同 ' + resp.cno + ' 成功！');
                }
                console.log(resp.error);
                if (resp.error) this.msg.error(resp.error);
                this.goBack();}).catch(error => this.msg.error(error));
        }
        
    }

    goBack() {
        this.router.navigateByUrl('/layout/content/contract_for_purchase/page');
    }

    initCreate() {
        this.title = '创建采购合同';
        this.breadcrumbItem = {label: this.title, routerLink: "/layout/content/contract_for_purchase/form"};
        this.globalService.addBreadcrumbItem(this.breadcrumbItem);
    }

    initUpdate() {
        this.title = '修改采购合同';
        this.contract = this.contractForPurchaseService.updateContract;
    }

    initAudit() {
        this.title = '审核采购合同';
        this.contract = this.contractForPurchaseService.updateContract;
    }

    initShow() {
        this.title = '查看采购合同';
        this.editable = false;
        this.contract = this.contractForPurchaseService.updateContract;
    }

    //合同额数字验证
    validateNumber(c: FormControl) {
        if (c.value > 0) { 
            this.amount_error='';
        } else if(c.touched || c.dirty) {
            this.amount_error='has-error';
        }
        return c.value > 0 ? null : {validateNumber: true}
    };

    // 自定义validator验证失败需调用该函数，为元素添加has-error类以显示红色高亮样式
    custom_validator() {
               if (!this.form.controls['amount'].valid) { this.amount_error = 'has-error' }
    }

}
