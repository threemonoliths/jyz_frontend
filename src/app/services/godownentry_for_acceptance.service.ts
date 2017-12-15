import { Injectable } from '@angular/core';
import { Http, URLSearchParams, RequestOptions, Headers } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { GodownentryForAcceptance, GodownentryForAcceptanceDetail } from '../domains/godownentry_for_acceptance.domain';
import { baseUrl } from './global.service';
import { getTokenOptions } from './login.service';
import { dateToString } from '../utils/utils'
@Injectable()
export class GodownentryForAcceptanceService {

  constructor(private http: Http) {}
   
  url = baseUrl+"godownentry_for_acceptance"

  listOnePage(q) {
    console.log(q.audited.value);
    return this.http.get(this.url + `?page=${q.pi}&page_size=${q.ps}&sort_field=${q.sf}&sort_direction=${q.sd}&bno=${q.bno}&audited=${q.audited.value}`, getTokenOptions() )
               .toPromise().then(res => {console.log(res);return res.json()})           
  }

  add(v): Promise<any>{ 
    let obj = { godownentryforacceptance: v} 
    let param = JSON.stringify(obj);
    return this.http.post(this.url, param, getTokenOptions())
               .map(response => response.json()).toPromise();
  }

  delete(id: any) {
    return this.http.delete(this.url + `/${id}`, getTokenOptions())
               .map(response => response.json())
               .toPromise();
  }

  isUpdate = false;
  isAudit = false;
  formOperation = 'create';
  updateGodownentry : GodownentryForAcceptance = null;

  //获取油品入库单对象将提供给修改页面Form使用
  initUpdate(id){
    return this.http.get(this.url + `/${id}`, getTokenOptions())
               .map(response => response.json()).toPromise();
  }

  update(cid, v): Promise<any>{ 
    let obj = { godownentryforacceptance: v} 
    let param = JSON.stringify(obj);
    return this.http.post(this.url + `/${cid}`,param, getTokenOptions())
               .map(response => response.json()).toPromise();
  }

  audit(cid): Promise<any>{
    return this.http.get(this.url + `/audit/${cid}`, getTokenOptions())
               .map(response => response.json()).toPromise();
  }

  getDate(v) {
    v.date = dateToString(v.date)
  }

}