import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NzMessageService } from 'ng-zorro-antd';

import { GlobalService } from '../../../../services/global.service';
import { GodownentryForAcceptanceService } from '../../../../services/godownentry_for_acceptance.service';
import { getRule, saveRule, removeRule } from '../../../../../../_mock/rule.service';

import { AuditPipe } from '../../../../pipes/pipes'; 

@Component({
    selector: 'godownentry-table-list',
    templateUrl: './list.component.html'
})
export class GodownentryForAcceptanceListComponent implements OnInit {

    testp = true

    title = "油品入库单管理";
    breadcrumbItem = {label: "油品入库单", routerLink: "/layout/content/godownentry_for_acceptance/page"}

    // 查询对象，包括分页、排序和查询字段的值
    q: any = 
        {
            pi: 1,
            ps: 15,
            sf: "supplier",
            sd: "desc",
            bno: "",
            supplier:"",
            cno:"",
            audited:"",
            audit_time:"",
            
        };
    
    // 记录总数
    total: number;
   

    data: any[] = [];
    loading = false;
    selectedRows: any[] = [];
    curRows: any[] = [];
    totalCallNo = 0;
    allChecked = false;
    indeterminate = false;

    sortMap: any = {};
    expandForm = false;
    modalVisible = false;
    description = '';

    constructor(public msg: NzMessageService, private globalService: GlobalService,
                private godownentryForAcceptanceService: GodownentryForAcceptanceService, private router: Router) {}

    ngOnInit() {
        console.log(this.q);
        this.getData();
        this.globalService.setTitle(this.title);
        this.globalService.addBreadcrumbItem(this.breadcrumbItem);
    }

    getData() {
        console.log("in getData")
        console.log(this.q)
        this.loading = true;
        
        this.godownentryForAcceptanceService.listOnePage(this.q).then(resp =>  {this.data = resp.entries;this.total = resp.total_entries; this.loading = false;})
                                                     .catch((error) => {this.msg.error(error); this.loading = false;})                                           
    }

    add() {
         //新增按钮事件
        this.godownentryForAcceptanceService.formOperation = 'create';
        //this.godownentryForAcceptanceService.isUpdate=false;
        this.router.navigateByUrl('/layout/content/godownentry_for_acceptance/form');
    }
    

    save() {
        
        saveRule(this.description);
        this.getData();
        setTimeout(() => this.modalVisible = false, 500);
    }

    remove() {
        this.selectedRows.forEach(i => removeRule(i.no));
        this.getData();
        this.clear();
    }

    approval() {
        this.msg.success(`审批了 ${this.selectedRows.length} 笔`);
    }

    clear() {
        this.selectedRows = [];
        this.totalCallNo = 0;
        this.data.forEach(i => i.checked = false);
        this.refreshStatus();
    }

    checkAll(value: boolean) {
        this.curRows.forEach(i => {
            if (!i.disabled) i.checked = value;
        });
        this.refreshStatus();
    }

    refreshStatus() {
        const allChecked = this.curRows.every(value => value.disabled || value.checked);
        const allUnChecked = this.curRows.every(value => value.disabled || !value.checked);
        this.allChecked = allChecked;
        this.indeterminate = (!allChecked) && (!allUnChecked);
        this.selectedRows = this.data.filter(value => value.checked);
        this.totalCallNo = this.selectedRows.reduce((total, cv) => total + cv.callNo, 0);
    }

    sort(field: string, value: any) {
        // this.sortMap = {};
        // this.sortMap[field] = value;
        // this.q.sorter = value ? `${field}_${value}` : '';
        // this.sortMap
        //this.loading = true;
        console.log("sort value is:")
        console.log(value);
        this.q.sf = field;
        let direction = value ? this.getSortDirection(value) : 'desc';
        this.q.sd = direction;
        console.log(this.q)
        this.getData();
    }

    dataChange(res: any) {
        this.curRows = res;
        this.refreshStatus();
    }

    pageChange(pi: number) {
        this.q.pi = pi;
        //this.loading = true;
        this.getData();
        // return new Promise((resolve) => {
        //     setTimeout(() => {
        //         this.loading = false;
        //         resolve();
        //     }, 500);
        // });
    }

    search() {
        //this.loading = true;
        this.q.pi = 1;
        this.getData()
    }

    // reset(ls: any[]) {
    //     for (const item of ls) item.value = false;
    //     this.getData();
    // }

    getSortDirection(c: string) {
        if (c=="ascend") {
            return "asc"
        }else if (c=="descend") {
            return "desc"
        }else {
            return ""
        }
    }

    delete(id) {
        this.godownentryForAcceptanceService.delete(id).then(resp =>  {
            if ('error' in resp) { 
                this.msg.error(resp.error);
            } else {
                this.msg.success('删除油品入库单：'+resp.bno + '成功！');
            }
            this.getData()}).catch(error => this.msg.error(error));
    }

    //更新按钮事件
    update(id): void {
        this.godownentryForAcceptanceService.formOperation='update';
        this.godownentryForAcceptanceService.initUpdate(id)
            .then(result => { this.godownentryForAcceptanceService.updateGodownentry = result; 
                                this.godownentryForAcceptanceService.updateGodownentry.details = result.godownentry_for_acceptance_details})
            .then(() => this.router.navigateByUrl('/layout/content/godownentry_for_acceptance/form')).catch((error)=>
            console.log(error)); 

    }

    //审核按钮事件
    audit(id) :void {
        this.godownentryForAcceptanceService.formOperation='audit';
        this.godownentryForAcceptanceService.initUpdate(id)
            .then(result => { this.godownentryForAcceptanceService.updateGodownentry = result; 
                              this.godownentryForAcceptanceService.updateGodownentry.details = result.godownentry_for_acceptance_details})
            .then(() => this.router.navigateByUrl('/layout/content/godownentry_for_acceptance/form')).catch((error)=>
            console.log(error)); 
    }

    show(id) :void {
        this.godownentryForAcceptanceService.formOperation='show';
        this.godownentryForAcceptanceService.initUpdate(id)
            .then(result => { this.godownentryForAcceptanceService.updateGodownentry = result; 
                              this.godownentryForAcceptanceService.updateGodownentry.details = result.godownentry_for_acceptance_details})
            .then(() => this.router.navigateByUrl('/layout/content/godownentry_for_acceptance/form')).catch((error)=>
            console.log(error));
    }
}
