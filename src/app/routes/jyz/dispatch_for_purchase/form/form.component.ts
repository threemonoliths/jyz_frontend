import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl,Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd'  
import { DispatchForPurchaseService } from '../../../../services/dispatch_for_purchase.service';
import {DispatchForPurchase } from '../../../../domains/dispatch_for_purchase.domain';
import { GlobalService } from '../../../../services/global.service';

import { stringToDate } from '../../../../utils/utils'; 
import { DictService } from '../../../../services/dict.service';
@Component({
    selector: 'dispatch_for_purchase-form',
    templateUrl: './form.component.html'
})
export class DispatchForPurchaseFormComponent implements OnInit {
    editIndex = -1;
    editObj = {};
    form: FormGroup;
    title = '创建油品配送出库单';
    breadcrumbItem = {label: "油品配送出库单", routerLink: "/layout/content/dispatch_for_purchase/form"}
    dispatch: DispatchForPurchase; 
    editable = true;
    yesorno = true;
   
    //自动以验证器，验证失败时，需要手工添加class:has-error
    amount_error = ''

    constructor(private fb: FormBuilder, private router: Router, private dispatchForPurchaseService: DispatchForPurchaseService,

                private globalService: GlobalService,private msg:NzMessageService,private oilDepotService:OilDepotService ,private dictService: DictService) {}

 

    ngOnInit() {
        this.getDictOil();

        this.getDepot();
         let op = this.dispatchForPurchaseService.formOperation;
        if (op == 'create') this.initCreate();
        if (op == 'update') this.initUpdate();
        if (op == 'audit') this.initAudit();
        if( op == 'show') this.initShow();
        console.log(this.dispatch)
        this.form = this.fb.group({
            billno: [this.dispatch? this.dispatch.billno : '', [Validators.required,Validators.minLength(4)]],
            date: [this.dispatch? stringToDate(this.dispatch.date):'', [Validators.required]],
            purchaser: [this.dispatch? this.dispatch.purchaser : '', [Validators.required]],
            stockplace : [this.dispatch? this.dispatch.stockplace : '', [Validators.required]],
            quantity : [this.dispatch? this.dispatch.quantity : '', [Validators.required, this.validateNumber.bind(this)]],
            total : [this.dispatch? this.dispatch.total : '', [Validators.required, this.validateNumber.bind(this)]],
            dispatcher : [this.dispatch? this.dispatch.dispatcher : '', [Validators.required]],
            stockman : [this.dispatch? this.dispatch.stockman : '', [Validators.required]],
            accountingclerk : [this.dispatch? this.dispatch.accountingclerk : '', [Validators.required]],

            audited : [this.dispatch? this.dispatch.audited : '未审核'],
            audit_time : [this.dispatch? this.dispatch.audit_time : ''],
            audit_user : [this.dispatch? this.dispatch.audit_user : ''],
            create_user : [this.dispatch? this.dispatch.create_user : ''],
            details: this.fb.array([])
        });
         if ((op == 'update') || (op=='audit')||( op=='show')){
        this.dispatch.details? this.dispatch.details.forEach(i => {
            const field = this.createDetail();
            field.patchValue(i);
            this.details.push(field);
        }) : console.log("tihs dispatch has no details.");}

    }

    createDetail(): FormGroup {
        return this.fb.group({
            oilname: [ null, [ Validators.required ] ],
            unit: [ null, [ Validators.required ] ],
            startdegree: [ null, [ Validators.required, this.validateNumber.bind(this) ] ],
            enddegree: [ null, [ Validators.required, this.validateNumber.bind(this) ] ],
            quantity: [ 0, [ Validators.required ] ],
            confirmation: [ null, [ Validators.required ] ]
            
        });
    }

    //#region get form fields
    get billno() { return this.form.controls.billno; }
    get date() { return this.form.controls.date; }
    get purchaser() { return this.form.controls.purchaser; }
    get stockplace() { return this.form.controls.stockplace; }
    get quantity() { return this.form.controls.quantity; }
    get total() { return this.form.controls.total; }
    get dispatcher() { return this.form.controls.dispatcher; }
    get stockman() { return this.form.controls.stockman; }
    get accountingclerk() { return this.form.controls.accountingclerk; }
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
        if (this.details.at(index).invalid) return ;
        let total = this.details.at(index)['controls']['enddegree'].value - this.details.at(index)['controls']['startdegree'].value
        this.details.at(index)['controls']['quantity'].setValue(total)
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
        // this.custom_validator();
         
        for (const i in this.form.controls) {
          this.form.controls[ i ].markAsDirty();
        }
        if (this.form.invalid) return ;
        if (this.form.valid) {
            let op = this.dispatchForPurchaseService.formOperation;
           if (op == 'create') this.dispatchForPurchaseService.add(this.form.value).then(resp => {
                if (resp.error) { 
                    this.msg.error(resp.error);
                } else {
                    this.msg.success('创建油品配送出库单 ' + resp.billno + ' 成功！');
                }
                console.log(resp);this.goBack()}).catch(error => this.msg.error(error));
            if (op == 'update') this.dispatchForPurchaseService.update(this.dispatch.id, this.form.value).then(resp => {
                if (resp.error) { 
                    this.msg.error(resp.error);
                } else {
                    this.msg.success('更新油品配送出库单 ' + resp.billno + ' 成功！');
                }
                this.goBack();}).catch(error => this.msg.error(error));
            if (op == 'audit') this.dispatchForPurchaseService.audit(this.dispatch.id).then(resp => {
                if (resp.error) { 
                    this.msg.error(resp.error);
                } else {
                    this.msg.success('审核油品配送出库单 ' + resp.billno + ' 成功！');
                }
                console.log(resp.error);
                if (resp.error) this.msg.error(resp.error);
                this.goBack();}).catch(error => this.msg.error(error));
        }
        
    }

    goBack() {
        this.router.navigateByUrl('/layout/content/dispatch_for_purchase/page');
    }
   initCreate() {
        this.title = '创建油品配送出库单';
        this.breadcrumbItem = {label: this.title, routerLink: "/layout/content/dispatch_for_purchase/form"};
        this.globalService.addBreadcrumbItem(this.breadcrumbItem);
    }

    initUpdate() {
        this.title = '修改油品配送出库单';
        this.dispatch = this.dispatchForPurchaseService.updateDispatch;
    }

    initAudit() {
        this.editable=false;
        this.yesorno=true;
        this.title = '审核油品配送出库单';
        this.dispatch = this.dispatchForPurchaseService.updateDispatch;
    }
 initShow() {
        this.title = '查看优品配送出库单';
        this.editable = false;
        this.yesorno=false;
        this.dispatch = this.dispatchForPurchaseService.updateDispatch;
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



    
    depotdata: any[] = [];
    oildata: any[]=[];
    p: any = 
    {
        name: "fuel_type",
    };
  
    getDepot() {
        console.log("in getDepot")
    this.oilDepotService.listAll().then(resp =>  {this.depotdata = resp.entries;})
                                                     .catch((error) => {this.msg.error(error);})                                           
    }
    getDictOil() {
        console.log("in getOil")
    this.dictService.listAll(this.p).then(resp =>  {this.oildata = resp.entries;})
                                                     .catch((error) => {this.msg.error(error);})                                           
    }
    }
   


