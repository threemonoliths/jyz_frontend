import { NzMessageService } from 'ng-zorro-antd';
import { Component, OnInit } from '@angular/core';
import { getFakeChartData } from '../../../../../_mock/chart.service';
import { getTimeDistance, yuan } from 'app/utils/utils';
import { GlobalService } from '../../../services/global.service';

@Component({
    selector: 'app-dashboard-v1',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
    data: any = {
        salesData: [],
        offlineData: []
    };
    loading = true;
    q: any = {
        start: null,
        end: null
    };
    rankingListData: any[] = Array(7).fill({}).map((item, i) => {
        return {
            title: ` ${i} 号仓库`,
            total: 323234
        };
    });

    

    constructor(public msg: NzMessageService, private globalService: GlobalService) {}

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
                    return (sortValue === 'ascend') ? 1 : -1;
                } else if (a[ sortName ] < b[ sortName ]) {
                    return (sortValue === 'ascend') ? -1 : 1;
                } else {
                    return 0;
                }
            })
        ];
    }

    salesType = 'all';
    salesPieData: any;
    salesTotal = 0;
    changeSaleType() {
        this.salesPieData = this.salesType === 'all' ? this.data.salesTypeData : (
            this.salesType === 'online' ? this.data.salesTypeDataOnline : this.data.salesTypeDataOffline
        );
        this.salesTotal = this.salesPieData.reduce((pre, now) => now.y + pre, 0);
    }

    handlePieValueFormat(value: any) {
        return yuan(value);
    }

    _activeTab = 0;
    _tabChange(value: any) {
        console.log('tab', this._activeTab, value);
    }

    
}





