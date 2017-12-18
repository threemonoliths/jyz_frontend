import { Injectable } from '@angular/core';
import { Http, URLSearchParams, RequestOptions, Headers } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Dict  } from '../domains/dict.domain';
import { baseUrl } from './global.service';
import { getTokenOptions } from './login.service';

import { dateToString } from '../utils/utils'
//import { setTokenOptions } from '../_services/authentication.service';
@Injectable()
export class DictService {

  constructor(private http: Http) {}
   
  url = baseUrl+"dict"

  listOnePage(q) {
    return this.http.get(this.url + `?page=${q.pi}&page_size=${q.ps}&sort_field=${q.sf}&sort_direction=${q.sd}&name=${q.name}`, getTokenOptions() )
               .toPromise().then(res => {return res.json()})           
  }
  listAll(q) {
    return this.http.get(this.url +`?name=${q.name}`, getTokenOptions() )
               .toPromise().then(res => {return res.json()})           
  }

  add(v): Promise<any>{    
    let obj = { dict: v} 
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
 

  formOperation = 'create';
  updateDict : Dict = null;

  //获取数据字典对象将提供给修改页面Form使用
  initUpdate(id){

    return this.http.get(this.url + `/${id}`, getTokenOptions())
               .map(response => response.json()).toPromise();

  }

  update(cid, v): Promise<any>{ 
    let obj = { dict: v} 
    let param = JSON.stringify(obj);
    return this.http.post(this.url + `/${cid}`,param, getTokenOptions())
               .map(response => response.json()).toPromise();
  }
  

}