import { Injectable } from '@angular/core';
import { Http, URLSearchParams, RequestOptions, Headers } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { CarryForAccount, CarryForAccountDetail } from '../domains/carry_for_account.domain';
import { baseUrl } from './global.service';
import { getTokenOptions } from './login.service';
import { dateToString } from '../utils/utils'

@Injectable()
export class CarryForAccountService {

  constructor(private http: Http) {}
   
  url = baseUrl+"carry_for_account"

  listOnePage(q) {
    return this.http.get(this.url + `?page=${q.pi}&page_size=${q.ps}&sort_field=${q.sf}&sort_direction=${q.sd}&companyname=${q.companyname}&audited=${q.audited.value}`, getTokenOptions() )
               .toPromise().then(res => { console.log(res); return res.json()})           
  }

  add(v): Promise<any>{ 
    this.getDate(v);
    let obj = { carryforaccount: v} 
    console.log(obj);
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
  updateCarryAccount : CarryForAccount = null;

  //获取合同对象将提供给修改页面Form使用
  initUpdate(id){
    return this.http.get(this.url + `/${id}`, getTokenOptions())
               .map(response => response.json()).toPromise();
  }

  update(cid, v): Promise<any>{
    this.getDate(v); 
    let obj = { carryforaccount: v} 
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