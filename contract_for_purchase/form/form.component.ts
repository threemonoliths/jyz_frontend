import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

import { Router } from '@angular/router';

import { ContractForPurchaseService } from '../../../../services/contract_for_purchase.service';
import { ContractForPurchase } from '../../../../domains/contract_for_purchase.domain'; 
import { GlobalService } from '../../../../services/global.service';

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

    constructor(private fb: FormBuilder, private router: Router, private contractForPurchaseService: ContractForPurchaseService, 
                private globalService: GlobalService) {}

    ngOnInit() {
        let op = this.contractForPurchaseService.formOperation;
        if (op == 'create') this.initCreate();
        if (op == 'update') this.initUpdate();
        if (op == 'audit') this.initAudit();
        this.form = this.fb.group({
            cno: [this.contract? this.contract.cno : '', [Validators.required]],
            date: [this.contract? this.contract.date : '', [Validators.required]],
            location: [this.contract? this.contract.location : '', [Validators.required]],
            amount : [this.contract? this.contract.amount : 0, [Validators.required]],
            partya : [this.contract? this.contract.partya : '', [Validators.required]],
            partyb : [this.contract? this.contract.partyb : '', [Validators.required]],

            audited : [this.contract? this.contract.audited : ''],
            audit_time : [this.contract? this.contract.audit_time : ''],
            audit_user : [this.contract? this.contract.audit_user : ''],
            create_user : [this.contract? this.contract.create_user : ''],

            details: this.fb.array([])
        });
        if ((op == 'update') || (op=='audit')){
        this.contract.details? this.contract.details.forEach(i => {
            const field = this.createUser();
            field.patchValue(i);
            console.log(field);
            this.details.push(field);
        }) : console.log("tihs contract has no details.");}
    }

    createUser(): FormGroup {
        return this.fb.group({
            product: [ null, [ Validators.required ] ],
            model: [ null, [ Validators.required ] ],
            producer: [ null, [ Validators.required ] ],
            amount: [ 0, [ Validators.required ] ],
            unit: [ null, [ Validators.required ] ],
            price: [ 0, [ Validators.required ] ],
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

        for (const i in this.form.controls) {
          this.form.controls[ i ].markAsDirty();
        }
        if (this.form.invalid) return ;
        if (this.form.valid) {
            let op = this.contractForPurchaseService.formOperation;
            if (op == 'create') this.contractForPurchaseService.add(this.form.value).then(resp => this.goBack());
            if (op == 'update') this.contractForPurchaseService.update(this.contract.id, this.form.value).then(resp => this.goBack());
            if (op == 'audit') this.contractForPurchaseService.audit(this.contract.id).then(resp => this.goBack());
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
}
