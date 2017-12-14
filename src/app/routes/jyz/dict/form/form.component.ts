import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';

import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';

import { DictService } from '../../../../services/dict.service';
import { Dict } from '../../../../domains/dict.domain'; 
import { GlobalService } from '../../../../services/global.service';

import { stringToDate} from '../../../../utils/utils';

@Component({
    selector: 'dict-form',
    templateUrl: './form.component.html' 
})
export class DictFormComponent implements OnInit {
    editIndex = -1;
    editObj = {};

    form: FormGroup;

    title = '创建数据字典';
    breadcrumbItem = {label: "数据字典", routerLink: "/layout/content/dict/form"}

    dict: Dict;


    editable = true;

    // 自定义验证器，验证失败时，需要手工添加class：has-error

    constructor(private fb: FormBuilder, private router: Router, private DictService: DictService, 
                private globalService: GlobalService, private msg: NzMessageService) {}

    ngOnInit() {
        let op = this.DictService.formOperation;
        if (op == 'create') this.initCreate();
        if (op == 'update') this.initUpdate();
        if (op == 'show') this.initShow();
        console.log(this.dict)
        this.form = this.fb.group({
            code : [this.dict? this.dict.code : ''],
            name : [this.dict? this.dict.name : ''],
            key : [this.dict? this.dict.key : ''],
            parm : [this.dict? this.dict.parm : ''],
        });       

    }


    //#region get form fields
    get code() { return this.form.controls.code; }
    get name() { return this.form.controls.name; }
    get key() { return this.form.controls.key; }
    get parm() { return this.form.controls.parm; }


    _submitForm() {
      

        for (const i in this.form.controls) {
          this.form.controls[ i ].markAsDirty();
        }
        if (this.form.invalid) return ;
        if (this.form.valid) {
            let op = this.DictService.formOperation;
            if (op == 'create') this.DictService.add(this.form.value).then(resp => {
                if (resp.error) { 
                    this.msg.error(resp.error);
                } else {
                    console.log("+++");
                    this.msg.success('增加数据字典 ' + resp.name + ' 成功！');
                }
                console.log(resp);this.goBack()}).catch(error => this.msg.error(error));
            if (op == 'update') this.DictService.update(this.dict.id, this.form.value).then(resp => {
                if (resp.error) { 
                    this.msg.error(resp.error);
                } else {
                    this.msg.success('更新数据字典 ' + resp.name + ' 成功！');
                }
                this.goBack();}).catch(error => this.msg.error(error));
         
        }
        
    }

    goBack() {
        this.router.navigateByUrl('/layout/content/dict/page');
    }

    initCreate() {
        this.title = '增加数据字典';
        this.breadcrumbItem = {label: this.title, routerLink: "/layout/content/dict/form"};
        this.globalService.addBreadcrumbItem(this.breadcrumbItem);
    }

    initUpdate() {
        this.title = '修改数据字典';
        this.dict = this.DictService.updateDict;
    }

    

    initShow() {
        this.title = '查看数据字典'; 
        this.editable = false;
        this.dict = this.DictService.updateDict;
    }

  

  

}
