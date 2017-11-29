import {Component,OnInit} from '@angular/core';

import { GlobalService } from '../../../services/global.service';

@Component({
    templateUrl: './content.component.html'
})
export class ContentComponent implements OnInit {

    constructor(private globalService: GlobalService) { }

    ngOnInit() {
        
    }
}