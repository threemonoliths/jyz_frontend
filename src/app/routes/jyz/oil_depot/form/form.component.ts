import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';

import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';

import { OilDepotService } from '../../../../services/oil_depot.service';
import { OilDepot } from '../../../../domains/oil_depot.domain'; 
import { GlobalService } from '../../../../services/global.service';

import { stringToDate} from '../../../../utils/utils';

@Component({
    selector: 'oil_depot-form',
    templateUrl: './form.component.html' 
})
export class OilDepotFormComponent implements OnInit {
    editIndex = -1;
    editObj = {};

    form: FormGroup;

    title = '创建仓库信息';
    breadcrumbItem = {label: "仓库信息", routerLink: "/layout/content/oil_depot/form"}

    depot: OilDepot;


    editable = true;

    // 自定义验证器，验证失败时，需要手工添加class：has-error
    number_error = ''

    constructor(private fb: FormBuilder, private router: Router, private oilDepotService: OilDepotService, 
                private globalService: GlobalService, private msg: NzMessageService) {}

    ngOnInit() {
        let op = this.oilDepotService.formOperation;
        if (op == 'create') this.initCreate();
        if (op == 'update') this.initUpdate();
       // if (op == 'audit') this.initAudit();
        if (op == 'show') this.initShow();
        console.log(this.depot)
        this.form = this.fb.group({
            oilname : [this.depot? this.depot.oilname : ''],
            depotname : [this.depot? this.depot.depotname : ''],
            depotiddr : [this.depot? this.depot.depotiddr : ''],
            kind : [this.depot? this.depot.kind : ''],
            number : [this.depot? this.depot.number : '',[Validators.required, this.validateNumber.bind(this)]],
        });       

    }


    //#region get form fields
    get oilname() { return this.form.controls.oilname; }
    get depotname() { return this.form.controls.depotname; }
    get depotiddr() { return this.form.controls.depotiddr; }
    get kind() { return this.form.controls.kind; }
    get number() { return this.form.controls.number; }


    _submitForm() {
        //this.msg.success(`Copied Success!`);
        //this.custom_validator(); 

        for (const i in this.form.controls) {
          this.form.controls[ i ].markAsDirty();
        }
        if (this.form.invalid) return ;
        if (this.form.valid) {
            let op = this.oilDepotService.formOperation;
            if (op == 'create') this.oilDepotService.add(this.form.value).then(resp => {
                if (resp.error) { 
                    this.msg.error(resp.error);
                } else {
                    this.msg.success('增加仓库信息 ' + resp.depotname + ' 成功！');
                }
                console.log(resp);this.goBack()}).catch(error => this.msg.error(error));
            if (op == 'update') this.oilDepotService.update(this.depot.id, this.form.value).then(resp => {
                if (resp.error) { 
                    this.msg.error(resp.error);
                } else {
                    this.msg.success('更新仓库信息 ' + resp.depotname + ' 成功！');
                }
                this.goBack();}).catch(error => this.msg.error(error));
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
        this.router.navigateByUrl('/layout/content/oil_depot/page');
    }

    initCreate() {
        this.title = '增加仓库信息';
        this.breadcrumbItem = {label: this.title, routerLink: "/layout/content/oil_depot/form"};
        this.globalService.addBreadcrumbItem(this.breadcrumbItem);
    }

    initUpdate() {
        this.title = '修改仓库信息';
        this.depot = this.oilDepotService.updateDepot;
    }

    // initAudit() {
    //     this.title = '审核采购合同';
    //     this.depot = this.depotForPurchaseService.updateDepot;
    // }

    initShow() {
        this.title = '查看仓库信息'; 
        this.editable = false;
        this.depot = this.oilDepotService.updateDepot;
    }

    //验证仓库数量字段是否为负值
    validateNumber(c: FormControl) {
        if (c.value >= 0) { 
            this.number_error='';
        } 
        // else if (c.value == 0) { 
        //     this.number_error='';
        // } 
        else if(c.touched || c.dirty) {
            this.number_error='has-error';
        }
        return c.value >= 0 ? null : {validateNumber: true}
    };

    // 自定义validator验证失败需调用该函数，为元素添加has-error类以显示红色高亮样式
    custom_validator() {
        if (!this.form.controls['number'].valid) { this.number_error = 'has-error' }
    }

}
