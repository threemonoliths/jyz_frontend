import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';

import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';

import { StockChangeService } from '../../../../services/stock_change.service';
import { StockChange } from '../../../../domains/stock_change.domain'; 
import { GlobalService } from '../../../../services/global.service';

import { stringToDate} from '../../../../utils/utils';

@Component({
    selector: 'stock_change-form',
    templateUrl: './form.component.html' 
})
export class StockChangeFormComponent implements OnInit {
    editIndex = -1;
    editObj = {};

    form: FormGroup;

    title = '创建计算信息';
    breadcrumbItem = {label: "计算信息", routerLink: "/layout/content/stock_change/form"}

    stockchange: StockChange;


    editable = true;

    // 自定义验证器，验证失败时，需要手工添加class：has-error
    //amount_error = ''

    constructor(private fb: FormBuilder, private router: Router, private stockchangeService: StockChangeService, 
                private globalService: GlobalService, private msg: NzMessageService) {}

    ngOnInit() {
        let op = this.stockchangeService.formOperation;
        // if (op == 'create') this.initCreate();
        // if (op == 'update') this.initUpdate();
       // if (op == 'audit') this.initAudit();
        if (op == 'show') this.initShow();
        console.log(this.stockchange)
        this.form = this.fb.group({
            cno : [this.stockchange? this.stockchange.cno : ''],
            date : [this.stockchange? this.stockchange.date : ''],
            model : [this.stockchange? this.stockchange.model : ''],
            amount : [this.stockchange? this.stockchange.amount : ''],
            warehouse : [this.stockchange? this.stockchange.warehouse : ''],
            type : [this.stockchange? this.stockchange.type : ''],
            stockin : [this.stockchange? this.stockchange.stockin : ''],
            calculated : [this.stockchange? this.stockchange.calculated : ''],
        });       

    }


    //#region get form fields
    get cno() { return this.form.controls.cno; }
    get date() { return this.form.controls.date; }
    get model() { return this.form.controls.model; }
    get amount() { return this.form.controls.amount; }
    get warehouse() { return this.form.controls.warehouse; }
    get type() { return this.form.controls.type; }
    get stockin() { return this.form.controls.stockin; }
    get calculated() { return this.form.controls.calculated; }


    _submitForm() {
        //this.msg.success(`Copied Success!`);
        //this.custom_validator(); 

        for (const i in this.form.controls) {
          this.form.controls[ i ].markAsDirty();
        }
        if (this.form.invalid) return ;
        if (this.form.valid) {
            let op = this.stockchangeService.formOperation;
            // if (op == 'create') this.stockchangeService.add(this.form.value).then(resp => {
            //     if (resp.error) { 
            //         this.msg.error(resp.error);
            //     } else {
            //         this.msg.success('增加计算信息 ' + resp.depotname + ' 成功！');
            //     }
            //     console.log(resp);this.goBack()}).catch(error => this.msg.error(error));
            // if (op == 'update') this.stockchangeService.update(this.stockchange.id, this.form.value).then(resp => {
            //     if (resp.error) { 
            //         this.msg.error(resp.error);
            //     } else {
            //         this.msg.success('更新计算信息 ' + resp.cno + ' 成功！');
            //     }
            //     this.goBack();}).catch(error => this.msg.error(error));
            // if (op == 'audit') this.oilDepotService.audit(this.depot.id).then(resp => {
            //     if (resp.error) { 
            //         this.msg.error(resp.error);
            //     } else {
            //         this.msg.success('审核采购合同 ' + resp.cno + ' 成功！');
            //     }
            //     console.log(resp.error);
            //     if (resp.error) this.msg.error(resp.error);
            //     this.goBack();}).catch(error => this.msg.error(error));
        }
        
    }

    goBack() {
        this.router.navigateByUrl('/layout/content/stock_change/page');
    }

   

    initShow() {
        this.title = '查看计算信息'; 
        this.editable = false;
        this.stockchange = this.stockchangeService.updateStockChange;
    }

  

    

}
