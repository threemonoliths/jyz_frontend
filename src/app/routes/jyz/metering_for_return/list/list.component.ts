import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NzMessageService } from 'ng-zorro-antd';

import { GlobalService } from '../../../../services/global.service';
import { MeteringForReturnService } from '../../../../services/metering_for_return.service';
import { getRule, saveRule, removeRule } from '../../../../../../_mock/rule.service';

import { AuditPipe } from '../../../../pipes/pipes'; 

@Component({
    selector: 'metering-table-list',
    templateUrl: './list.component.html'
})
export class MeteringForReturnListComponent implements OnInit {

    testp = true

    title = "油品回罐管理";
    breadcrumbItem = {label: "回罐单", routerLink: "/layout/content/metering_for_return/page"}

    // 查询对象，包括分页、排序和查询字段的值
    q: any = 
        {
            pi: 1,
            ps: 15,
            sf: "billdate",
            sd: "desc",
            billno: ""
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
                private meteringForReturnService: MeteringForReturnService, private router: Router) {}

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
        
        this.meteringForReturnService.listOnePage(this.q).then(resp =>  {this.data = resp.entries;this.total = resp.total_entries; this.loading = false;})
                                                     .catch((error) => {console.log(error); this.loading = false;})                                           
    }

    add() {
         //新增按钮事件
        this.meteringForReturnService.formOperation = 'create';
        //this.contractForPurchaseService.isUpdate=false;
        this.router.navigateByUrl('/layout/content/metering_for_return/form');
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
        this.meteringForReturnService.delete(id).then(resp =>  {
            if ('error' in resp) { 
                this.msg.error(resp.error);
            } else {
                this.msg.success('删除油品回罐单：'+resp.billno + '成功！');
            }
            this.getData()}).catch(error => this.msg.error(error));
    }

    //更新按钮事件
    update(id): void {
        this.meteringForReturnService.formOperation='update';
        this.meteringForReturnService.initUpdate(id)
            .then(result => { this.meteringForReturnService.updateMetering= result; 
                                this.meteringForReturnService.updateMetering.details = result.metering_for_return_details})
            .then(() => this.router.navigateByUrl('/layout/content/metering_for_return/form')).catch((error)=>
            console.log(error)); 

    }

    //审核按钮事件
    audit(id) :void {
        this.meteringForReturnService.formOperation='audit';
        this.meteringForReturnService.initUpdate(id)
            .then(result => { this.meteringForReturnService.updateMetering = result; 
                              this.meteringForReturnService.updateMetering.details = result.metering_for_return_details})
            .then(() => this.router.navigateByUrl('/layout/content/metering_for_return/form')).catch((error)=>
            console.log(error)); 
    }
    show(id) :void {
        this.meteringForReturnService.formOperation='show';
        this.meteringForReturnService.initUpdate(id)
            .then(result => { this.meteringForReturnService.updateMetering = result; 
                              this.meteringForReturnService.updateMetering.details = result.metering_for_return_details})
            .then(() => this.router.navigateByUrl('/layout/content/metering_for_return/form')).catch((error)=>
            console.log(error));
    }
}
