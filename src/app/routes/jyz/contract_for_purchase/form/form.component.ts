import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

import { Router } from '@angular/router';

import { ContractForPurchaseService } from '../../../../services/contract_for_purchase.service';

@Component({
    selector: 'contract_for_purchase-form',
    templateUrl: './form.component.html'
})
export class ContractForPurchaseFormComponent implements OnInit {
    editIndex = -1;
    editObj = {};

    form: FormGroup;

    constructor(private fb: FormBuilder, private router: Router, private contractForPurchaseService: ContractForPurchaseService) {}

    ngOnInit() {
        this.form = this.fb.group({
            cno: [null, [Validators.required]],
            date: [null, [Validators.required]],
            location: [null, [Validators.required]],
            amount : [0, [Validators.required]],
            partya : [null, [Validators.required]],
            partyb : [null, [Validators.required]],

            audited : [null],
            audit_time : [null],
            audit_user : [null],
            create_user : [null],

            details: this.fb.array([])
        });
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
            this.contractForPurchaseService.add(this.form.value).then(resp => this.goBack());
        }
    }

    goBack() {
        this.router.navigateByUrl('/layout/content/contract_for_purchase/page');
    }
}
