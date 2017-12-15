import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { OilDepotService } from '../../../../services/oil_depot.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';

import { OilTransferService } from '../../../../services/oil_transfer.service';
import { OilTransfer } from '../../../../domains/oil_transfer.domain'; 
import { GlobalService } from '../../../../services/global.service';

import { stringToDate} from '../../../../utils/utils';

@Component({
    selector: 'oil_transfer-form',
    templateUrl: './form.component.html'
})
export class OilTransferFormComponent implements OnInit {
    editIndex = -1;
    editObj = {};

    form: FormGroup;

    title = '创建油品移库调拨单';
    breadcrumbItem = {label: "油品移库调拨单", routerLink: "/layout/content/oil_transfer/form"}

    transfer: OilTransfer;


    editable = true;

    // 自定义验证器，验证失败时，需要手工添加class：has-error
    Positive_error = ''

    constructor(private fb: FormBuilder, private router: Router, private oilTransferService: OilTransferService, 
                private globalService: GlobalService, private msg: NzMessageService,private oilDepotService: OilDepotService) {}

    ngOnInit() {
        this.getDepot();
        let op = this.oilTransferService.formOperation;
        if (op == 'create') this.initCreate();
        if (op == 'update') this.initUpdate();
        if (op == 'audit') this.initAudit();
        if (op == 'show') this.initShow();
        console.log(this.transfer)
        this.form = this.fb.group({
            billno: [this.transfer? this.transfer.billno : '', [Validators.required, Validators.minLength(4)]],
            date: [this.transfer? stringToDate(this.transfer.date) : '', [Validators.required]],
            stockplace: [this.transfer? this.transfer.stockplace : '', [Validators.required]],
            dispatcher : [this.transfer? this.transfer.dispatcher : '', [Validators.required,]],
            stockman : [this.transfer? this.transfer.stockman : '', [Validators.required]],
            checker : [this.transfer? this.transfer.checker : '', [Validators.required]],                     

            audited : [this.transfer? this.transfer.audited : '未审核'],
            audit_time : [this.transfer? this.transfer.audit_time : ''],
            audit_user : [this.transfer? this.transfer.audit_user : ''],
            create_user : [this.transfer? this.transfer.create_user : ''],

            details: this.fb.array([])
        });
        if ((op == 'update') || (op=='audit'|| (op=='show'))){
        this.transfer.details? this.transfer.details.forEach(i => {
            const field = this.createDetail();
            field.patchValue(i);
            this.details.push(field);
        }) : console.log("tihs transfer has no details.");}

    }

    createDetail(): FormGroup {
        return this.fb.group({
            billno1: [ null, [ Validators.required ] ],
            stockpalce: [ null, [ Validators.required ] ],
            Unit: [ null, [ Validators.required ] ],
            Startdegree: [ null, [ Validators.required,this.validateNumber.bind(this)] ],
            Enddegree: [ null, [ Validators.required,this.validateNumber.bind(this) ] ],
            quantity: [ 0, [ Validators.required,this.validateNumber.bind(this) ] ],
            Confirmation: [ null, [ Validators.required ] ]
        });
    }

    //#region get form fields
    get billno() { return this.form.controls.billno; }
    get date() { return this.form.controls.date; }
    get stockplace() { return this.form.controls.stockplace; }
    get dispatcher() { return this.form.controls.dispatcher; }
    get stockman() { return this.form.controls.stockman; }
    get checker() { return this.form.controls.checker; }   
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
        //this.details.at(index)['controls']['quantity'].value = this.details.at(index)['controls']['Enddegree'].value - this.details.at(index)['controls']['Startdegree'].value
        let total = this.details.at(index)['controls']['Enddegree'].value - this.details.at(index)['controls']['Startdegree'].value
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
        //this.msg.success(`Copied Success!`);
       // this.custom_validator();

        for (const i in this.form.controls) {
          this.form.controls[ i ].markAsDirty();
        }
        if (this.form.invalid) return ;
        if (this.form.valid) {
            let op = this.oilTransferService.formOperation;
            if (op == 'create') this.oilTransferService.add(this.form.value).then(resp => {
                if (resp.error) { 
                    this.msg.error(resp.error);
                } else {
                    this.msg.success('创建油品移库调拨单 ' + resp.billno + ' 成功！');
                }
                console.log(resp);this.goBack()}).catch(error => this.msg.error(error));
            if (op == 'update') this.oilTransferService.update(this.transfer.id, this.form.value).then(resp => {
                if (resp.error) { 
                    this.msg.error(resp.error);
                } else {
                    this.msg.success('更新油品移库调拨单 ' + resp.billno + ' 成功！');
                }
                this.goBack();}).catch(error => this.msg.error(error));
            if (op == 'audit') this.oilTransferService.audit(this.transfer.id).then(resp => {
                if (resp.error) { 
                    this.msg.error(resp.error);
                } else {
                    this.msg.success('审核油品移库调拨单 ' + resp.billno + ' 成功！');
                }
                console.log(resp.error);
                if (resp.error) this.msg.error(resp.error);
                this.goBack();}).catch(error => this.msg.error(error));
        }
        
    }

    goBack() {
        this.router.navigateByUrl('/layout/content/oil_transfer/page');
    }

    initCreate() {
        this.title = '创建油品移库调拨单';
        this.breadcrumbItem = {label: this.title, routerLink: "/layout/content/oil_transfer/form"};
        this.globalService.addBreadcrumbItem(this.breadcrumbItem);
    }

    initUpdate() {
        this.title = '修改油品移库调拨单';
        this.transfer = this.oilTransferService.updateTransfer;
    }

    initAudit() {
        this.title = '审核油品移库调拨单';
       // this.editable = false;
        this.transfer = this.oilTransferService.updateTransfer;
    }

    initShow() {
        this.title = '查看油品移库调拨单';
        this.editable = false;
        this.transfer = this.oilTransferService.updateTransfer;
    }

     //非负数字验证
    validateNumber(c: FormControl) {       
        // if (c.value == 0){
        //     this.Positive_error='';
        //   }
        if (c.value >= 0 ) { 
            this.Positive_error='';
          }
        else if(c.touched || c.dirty) {
            this.Positive_error='has-error';
          }
        return c.value >= 0 ? null : {validateNumber: true}
    };

    // 自定义validator验证失败需调用该函数，为元素添加has-error类以显示红色高亮样式
    // custom_validator() {
    //     if (!this.form.controls['Startdegree'].valid) { this.Positive_error = 'has-error' }
    //     if (!this.form.controls['Enddegree'].valid) { this.Positive_error = 'has-error' }
    //     if (!this.form.controls['quantity'].valid) { this.Positive_error = 'has-error' }
    // }
    loading : false;
    
        q: any = 
        {
            pi: 1,
            ps: 15,
            sf: "depotiddr",
            sd: "desc",
            depotname: "",};
    
        totals : number;
        depotdata: any[] = [];
        getDepot() {
            console.log("in getDepot")
        this.oilDepotService.listOnePage(this.q).then(resp =>  {this.depotdata = resp.entries;this.totals = resp.total_entries; this.loading = false;})
                                                         .catch((error) => {this.msg.error(error);})                                           
        }

        
}
