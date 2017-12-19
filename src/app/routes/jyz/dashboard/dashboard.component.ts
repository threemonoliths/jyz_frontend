import { NzMessageService } from 'ng-zorro-antd';
import { Component, OnInit } from '@angular/core';
import { getFakeChartData } from '../../../../../_mock/chart.service';

import { GlobalService } from '../../../services/global.service';

@Component({
    selector: 'app-dashboard-v1',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {


    constructor(public msg: NzMessageService, private globalService: GlobalService) {}

    ngOnInit() {

    }


}
