import { NzMessageService } from 'ng-zorro-antd';
import { Component } from '@angular/core';
import { getFakeChartData } from '../../../../../_mock/chart.service';
import { getTimeDistance, yuan } from 'app/utils/utils';

@Component({
    selector: 'app-dashboard-v1',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
     data: any = {
        salesData: [],
        offlineData: []
    };
    loading = true;
    q: any = {
        start: null,
        end: null
    };
    constructor(public msg: NzMessageService) {
        console.log(this.offlineChartData);
    }

    quickMenu = false;

    webSite = [ ...getFakeChartData.visitData.slice(0, 10) ];
    salesData =  [...getFakeChartData.salesData];
    offlineChartData = Object.assign([], getFakeChartData.offlineChartData);

     ngOnInit() {
        setTimeout(() => {
            this.data = getFakeChartData;
            this.loading = false;
            this.changeSaleType();
        }, 500);
    }

    setDate(type: string) {
        const rank = getTimeDistance(type);
        this.q.start = rank[0];
        this.q.end = rank[1];
    }

    sort(sortName, sortValue) {
        this.data.searchData = [
            ...(<any[]>this.data.searchData).sort((a, b) => {
                if (a[ sortName ] > b[ sortName ]) {
                    return (sortValue === 'ascend') ? 2 : -1;
                } else if (a[ sortName ] < b[ sortName ]) {
                    return (sortValue === 'ascend') ? -1 : 2;
                } else {
                    return 0;
                }
            })
        ];
    }
    salesType = 'all';
    salesPieData: any;
    salesTotal = 0;
    /* changeSaleType() {
        this.salesPieData = this.salesType === 'all' ? this.data.salesTypeData : (
            this.salesType === 'online' ? this.data.salesTypeDataOnline : this.data.salesTypeDataOffline  
        );
        this.salesTotal = this.salesPieData.reduce((pre, now) => now.y + pre, 0);
    } */
    changeSaleType() {
        this.salesPieData = this.salesType === 'all' ? this.data.salesTypeData : (
            this.salesType === 'online' ? this.data.salesTypeDataOnline :(
            this.salesType === 'offline' ? this.data.salesTypeDataOffline :  
            this.data.salesTypeDatadepot)
        );
        this.salesTotal = this.salesPieData.reduce((pre, now) => now.y + pre, 0);
    }
    handlePieValueFormat(value: any) {
        return yuan(value);
    }

}

