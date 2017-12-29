import { NzMessageService } from 'ng-zorro-antd';
import { Component } from '@angular/core';
import { getFakeChartData } from '../../../../../_mock/chart.service';
<<<<<<< HEAD
import { getTimeDistance, yuan } from 'app/utils/utils';
import { GlobalService } from '../../../services/global.service';
=======
>>>>>>> 3ba615b80ca261966c4e7967181068801b663880

@Component({
    selector: 'app-dashboard-v1',
    templateUrl: './dashboard.component.html'
})
<<<<<<< HEAD
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





=======
export class DashboardComponent {

    constructor(public msg: NzMessageService) {
        console.log(this.offlineChartData);
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
    offlineChartData = Object.assign([], getFakeChartData.offlineChartData);
}

>>>>>>> 3ba615b80ca261966c4e7967181068801b663880
