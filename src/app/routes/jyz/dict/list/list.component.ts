import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NzMessageService, NzModalService } from 'ng-zorro-antd';

import { GlobalService } from '../../../../services/global.service';
import { DictService } from '../../../../services/dict.service';
import { getRule, saveRule, removeRule } from '../../../../../../_mock/rule.service';

import { AuditPipe } from '../../pipes/pipes'; 

@Component({
    selector: 'Dict-table-list',
    templateUrl: './list.component.html'
})
export class DictListComponent implements OnInit {

    testp = true

    title = "数据字典管理";
    breadcrumbItem = {label: "数据字典", routerLink: "/layout/content/dict/page"}

    // 查询对象，包括分页、排序和查询字段的值
    q: any = 
        {
            pi: 1,
            ps: 15,
            sf: "key", 
            sd: "desc",
            name: ""
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
                private dictService: DictService, private router: Router, private confirmserv:NzModalService) {}

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
        this.dictService.listOnePage(this.q).then(resp =>  {this.data = resp.entries;this.total = resp.total_entries; this.loading = false;})
                                                     .catch((error) => {this.msg.error(error); this.loading = false;})                                           
    }

    add() {
         //新增按钮事件
        this.dictService.formOperation = 'create';
        this.router.navigateByUrl('/layout/content/dict/form');
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
        this.confirmserv.confirm({
            title : '您是否要删除该数据字典',
            content :'点击 OK 删除',
            onOk : () =>{
        this.dictService.delete(id).then(resp =>  {
            if ('error' in resp) { 
                this.msg.error(resp.error);
            } else {
                this.msg.success('删除数据字典：'+resp.depotname + '成功！');
            }
            this.getData()}).catch(error => this.msg.error(error));
            }
        });
    }

    //更新按钮事件
    update(id): void {
        this.dictService.formOperation='update';
        this.dictService.initUpdate(id)
            .then(result => { this.dictService.updateDict = result})
            .then(() => this.router.navigateByUrl('/layout/content/dict/form')).catch((error)=>
            console.log(error)); 

    }

   
    show(id) :void {
        this.dictService.formOperation='show';
        this.dictService.initUpdate(id)
            .then(result => { this.dictService.updateDict = result})
            .then(() => this.router.navigateByUrl('/layout/content/dict/form')).catch((error)=>
            console.log(error));
    }
}
