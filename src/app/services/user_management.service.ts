import { Injectable } from '@angular/core';
import { Http, URLSearchParams, RequestOptions, Headers } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { UserManagement } from '../domains/user_management.domain';
import { baseUrl } from './global.service';
import { getTokenOptions } from './login.service';

import { dateToString } from '../utils/utils'
//import { setTokenOptions } from '../_services/authentication.service';
@Injectable()
export class UserManagementService {

  constructor(private http: Http) {}
   
  url = baseUrl+"users"

  listOnePage(q) {
    return this.http.get(this.url + `?page=${q.pi}&page_size=${q.ps}&sort_field=${q.sf}&sort_direction=${q.sd}&username=${q.username}`, getTokenOptions() )
               .toPromise().then(res => {return res.json()})           
  }

  add(v): Promise<any>{ 
    console.log("### in add ####")
    let obj = { user: v} 
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
  updateUserManagement : UserManagement = null;

  //获取用户对象将提供给修改页面Form使用
  initUpdate(id){

    return this.http.get(this.url + `/${id}`, getTokenOptions())
               .map(response => response.json()).toPromise();

  }

  activate(id){
    return this.http.post(this.url + `/${id}`+"/activate", "", getTokenOptions())
    .map(response => response.json())
    .toPromise();
  }

  update(cid, v): Promise<any>{
    console.log("this is update")
    let obj = { user: v} 
    let param = JSON.stringify(obj);
    return this.http.post(this.url + `/${cid}`,param, getTokenOptions())
               .map(response => response.json()).toPromise();
  }

  changePwd(pwd){
    return this.http.post(this.url + `/changepwd/${pwd}`,"", getTokenOptions())
    .map(response => response.json()).toPromise();
  }

  getByName(name){
    return this.http.get(this.url + `/username/${name}`, getTokenOptions())
    .map(response => response.json()).toPromise();
  }

}