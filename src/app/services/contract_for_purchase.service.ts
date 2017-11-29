import { Injectable } from '@angular/core';
import { Http, URLSearchParams, RequestOptions, Headers } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { ContractForPurchase, ContractForPurchaseDetail } from '../domains/contract_for_purchase.domain';
import { baseUrl } from './global.service';
import { getTokenOptions } from './login.service';
//import { setTokenOptions } from '../_services/authentication.service';
@Injectable()
export class ContractForPurchaseService {

  constructor(private http: Http) {}
   
  url = baseUrl+"contract_for_purchase"

  listOnePage(q) {
    return this.http.get(this.url + `?page=${q.pi}&page_size=${q.ps}&sort_field=${q.sf}&sort_direction=${q.sd}&cno=${q.cno}`, getTokenOptions() )
               .toPromise().then(res => {return res.json()})           
  }

  add(v): Promise<any>{ 

    let obj = { contractforpurchase: v} 
    let param = JSON.stringify(obj);
    return this.http.post(this.url, param, getTokenOptions())
               .map(response => response.json()).toPromise();
  }

  delete(id: any) {

    return this.http.delete(this.url + `/${id}`, getTokenOptions())
               .toPromise();
  }

  isUpdate = false;
  isAudit = false;
  updateContract : ContractForPurchase = null;
  //获取合同对象将提供给修改页面Form使用
  initUpdate(c: ContractForPurchase){
    let id = c.id;
    this.updateContract = c;
    return this.http.get(this.url + `/${id}`)
               .map(response => response.json()).toPromise();
               //.then(result => this.updateContract.detail = result); 
  }

  update(c: ContractForPurchase): Promise<any>{
    //this.isAudit=false;
    let details = JSON.stringify(this.parseDetails(c.details));
    let params = new URLSearchParams();
    // params.set('contractno', c.contractno);
    // params.set('signdate', c.signdate);
    // params.set('signplace', c.signplace);
    // params.set('totalprice', c.totalprice ? String(c.totalprice) : '0');
    // params.set('firstparty', c.firstparty);
    // params.set('secondparty', c.secondparty);
    // params.set('details', details);
    let id = c.id;
    return this.http.post(this.url + `/${id}`,params)
               .map(response => response.json()).toPromise();
              
   
  }
   
   //过滤掉没有填写产品名称的明细
   parseDetails(ds: Array<ContractForPurchaseDetail>) : any {
     let results = new Array<ContractForPurchaseDetail>();
     for ( let d of ds){
       if (d.product!=null) {
         results.push(d);
       }
     }
     return results;
   }
  

}