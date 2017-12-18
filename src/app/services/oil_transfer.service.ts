import { Injectable } from '@angular/core';
import { Http, URLSearchParams, RequestOptions, Headers } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { OilTransfer, OilTransferDetail } from '../domains/oil_transfer.domain';
import { baseUrl } from './global.service';
import { getTokenOptions } from './login.service';

import { dateToString } from '../utils/utils'
//import { setTokenOptions } from '../_services/authentication.service';
@Injectable()
export class OilTransferService {

  constructor(private http: Http) {}
   
  url = baseUrl+"oil_transfer"

  listOnePage(q) {
    return this.http.get(this.url + `?page=${q.pi}&page_size=${q.ps}&sort_field=${q.sf}&sort_direction=${q.sd}&billno=${q.billno}&audited=${q.audited.value}`, getTokenOptions() )
               //.toPromise().then(res => {return res.json()})  
               .toPromise().then(res => { console.log(res); return res.json()})         
  }

  add(v): Promise<any>{ 
    this.getDate(v);
    
    let obj = { oiltransfer: v} 
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
  updateTransfer : OilTransfer = null;

  //获取合同对象将提供给修改页面Form使用
  initUpdate(id){

    return this.http.get(this.url + `/${id}`, getTokenOptions())
               .map(response => response.json()).toPromise();

  }

  update(cid, v): Promise<any>{
    this.getDate(v);
    
    let obj = { oiltransfer: v} 
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