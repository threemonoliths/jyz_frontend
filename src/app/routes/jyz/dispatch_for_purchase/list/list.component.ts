import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NzMessageService } from 'ng-zorro-antd';

import { GlobalService } from '../../../../services/global.service';
import { DispatchForPurchaseService } from '../../../../services/dispatch_for_purchase.service';
import { getRule, saveRule, removeRule } from '../../../../../../_mock/rule.service';
import { AuditPipe } from '../../pipes/pipes'; 
@Component({
    selector: 'dispatch-table-list',
    templateUrl: './list.component.html'
})
export class DispatchForPurchaseListComponent implements OnInit {
    testp = true

    title = "油品配送出库单管理";
    breadcrumbItem = {label: "油品配送出库单", routerLink: "/layout/content/dispatch_for_purchase/page"}

    // 查询对象，包括分页、排序和查询字段的值
    q: any = 
        {
            pi: 1,
            ps: 15,
            sf: "date",
            sd: "desc",
            billno: "",
            date: "",
            purchaser:"",
            stockplace:"",
            quantity:"",
            total:"",
            dispatcher:"",
            stockman:"",
            accountingclerk:"",
            audit_time:"",
            audit_user:"",
            create_user:"",
            audited:"null"
           
        };
    
    // 记录总数
    total: number;
   
     // 状态查询
    options = [
        { value: null, label: '--' },
        { value: true, label: '已审核' },
        { value: false, label: '未审核' }
    ];

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
                private dispatchForPurchaseService: DispatchForPurchaseService, private router: Router) {}

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
        
          this.dispatchForPurchaseService.listOnePage(this.q).then(resp =>  {this.data = resp.entries;this.total = resp.total_entries; this.loading = false;})
                                                     .catch((error) => {this.msg.error(error); this.loading = false;})                                                            
    }

    add() {
         //新增按钮事件
         this.dispatchForPurchaseService.formOperation = 'create';
        // this.dispatchForPurchaseService.isUpdate=false;
        this.router.navigateByUrl('/layout/content/dispatch_for_purchase/form');
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
        this.dispatchForPurchaseService.delete(id).then(resp =>
            this.getData());
    }
    //更新按钮事件
    update(id): void {
        this.dispatchForPurchaseService.formOperation='update';
        this.dispatchForPurchaseService.initUpdate(id)
            .then(result => { this.dispatchForPurchaseService.updateDispatch = result; 
                                this.dispatchForPurchaseService.updateDispatch.details = result.dispatch_for_purchase_details})
            .then(() => this.router.navigateByUrl('/layout/content/dispatch_for_purchase/form')).catch((error)=>
            console.log(error)); 

    }

    //审核按钮事件
    audit(id) :void {
       
        this.dispatchForPurchaseService.formOperation='audit';
        this.dispatchForPurchaseService.initUpdate(id)
            .then(result => { this.dispatchForPurchaseService.updateDispatch = result; 
                              this.dispatchForPurchaseService.updateDispatch.details = result.dispatch_for_purchase_details})
            .then(() => this.router.navigateByUrl('/layout/content/dispatch_for_purchase/form')).catch((error)=>
            console.log(error)); 
    }
 show(id) :void {
        this.dispatchForPurchaseService.formOperation='show';
        this.dispatchForPurchaseService.initUpdate(id)
            .then(result => { this.dispatchForPurchaseService.updateDispatch = result; 
                              this.dispatchForPurchaseService.updateDispatch.details = result.dispatch_for_purchase_details})
            .then(() => this.router.navigateByUrl('/layout/content/dispatch_for_purchase/form')).catch((error)=>
            console.log(error));
    }
}

