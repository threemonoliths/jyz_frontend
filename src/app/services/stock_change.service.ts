import { Injectable } from '@angular/core';
import { Http, URLSearchParams, RequestOptions, Headers } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { StockChange } from '../domains/stock_change.domain';
import { baseUrl } from './global.service';
import { getTokenOptions } from './login.service';

import { dateToString } from '../utils/utils'
//import { setTokenOptions } from '../_services/authentication.service';
@Injectable()
export class StockChangeService {

  constructor(private http: Http) {}
   
  url = baseUrl+"stock_change"

  listOnePage(q) {
    return this.http.get(this.url + `?page=${q.pi}&page_size=${q.ps}&sort_field=${q.sf}&sort_direction=${q.sd}&cno=${q.cno}&warehouse=${q.warehouse}&type=${q.type}`, getTokenOptions() )
               .toPromise().then(res => {return res.json()})           
  }

 

  isUpdate = false;
  isAudit = false;

  formOperation = 'create';
  updateStockChange : StockChange = null;

  //获取合同对象将提供给修改页面Form使用
  initUpdate(id){

    return this.http.get(this.url + `/${id}`, getTokenOptions())
               .map(response => response.json()).toPromise();

  }

  
}