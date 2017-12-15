import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NzMessageService } from 'ng-zorro-antd';

import { GlobalService } from '../../../../services/global.service';
import { StockChangeService } from '../../../../services/stock_change.service';
import { getRule, saveRule, removeRule } from '../../../../../../_mock/rule.service';

import { CalculatedPipe, CalculateStatusPipe, AuditPipe } from '../../pipes/pipes'; 

@Component({
    selector: 'StockChange-table-list',
    templateUrl: './list.component.html'
})
export class StockChangeListComponent implements OnInit {

    testp = true

    title = "出入库明细表管理";
    breadcrumbItem = {label: "出入库明细表信息", routerLink: "/layout/content/stock_change/page"}

    // 查询对象，包括分页、排序和查询字段的值
    q: any = 
        {
            pi: 1,
            ps: 15,
            sf: "date", 
            sd: "desc",
            cno: ""
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
                private stockchangeService: StockChangeService, private router: Router) {}

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
        
        this.stockchangeService.listOnePage(this.q).then(resp =>  {this.data = resp.entries;this.total = resp.total_entries; this.loading = false;})
                                                     .catch((error) => {this.msg.error(error); this.loading = false;})                                           
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

    // approval() {
    //     this.msg.success(`审批了 ${this.selectedRows.length} 笔`);
    // }

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
      
        this.getData();
        
    }

    search() {
        
        this.q.pi = 1;
        this.getData()
    }

   

    getSortDirection(c: string) {
        if (c=="ascend") {
            return "asc"
        }else if (c=="descend") {
            return "desc"
        }else {
            return ""
        }
    }

 

    show(id) :void {
        this.stockchangeService.formOperation='show';
        this.stockchangeService.initUpdate(id)
            .then(result => { this.stockchangeService.updateStockChange = result})
            .then(() => this.router.navigateByUrl('/layout/content/stock_change/form')).catch((error)=>
            console.log(error));
    }
       
}
