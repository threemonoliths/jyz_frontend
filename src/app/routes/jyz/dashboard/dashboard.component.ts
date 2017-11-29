import { NzMessageService } from 'ng-zorro-antd';
import { Component, OnInit } from '@angular/core';
import { getFakeChartData } from '../../../../../_mock/chart.service';

import { GlobalService } from '../../../services/global.service';

@Component({
    selector: 'app-dashboard-v1',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

    title = "仪表盘";
    breadcrumbItem = {label: "仪表盘", routerLink: "/layout/content/dashboard"}

    constructor(public msg: NzMessageService, private globalService: GlobalService) {}

    ngOnInit() {
        this.globalService.setTitle(this.title);
        this.globalService.addBreadcrumbItem(this.breadcrumbItem);
    }

    todoData: any[] = [
        { completed: true, avatar: '1', name: '苏先生', content: `请告诉我，我应该说点什么好？` },
        { completed: false, avatar: '2', name: 'はなさき', content: `ハルカソラトキヘダツヒカリ` },
        { completed: false, avatar: '3', name: 'cipchk', content: `this world was never meant for one as beautiful as you.` },
        { completed: false, avatar: '4', name: 'Kent', content: `my heart is beating with hers` },
        { completed: false, avatar: '5', name: 'Are you', content: `They always said that I love beautiful girl than my friends` },
        { completed: false, avatar: '6', name: 'Forever', content: `Walking through green fields ，sunshine in my eyes.` }
    ];

    quickMenu = false;

    webSite = [ ...getFakeChartData.visitData.slice(0, 10) ];
    salesData =  [...getFakeChartData.salesData];
    offlineChartData = [...getFakeChartData.offlineChartData];
}
