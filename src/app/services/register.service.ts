import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { getTokenOptions } from './login.service';

import { baseUrl } from './global.service';
@Injectable()
export class RegisterService {

  constructor(private http: Http) {}
   
  url = baseUrl+"users"
  register(v): Promise<any>{ 
    let obj = { user: v} 
    let param = JSON.stringify(obj);
    return this.http.post(this.url, param, getTokenOptions())
               .map(response => response.json()).toPromise();
  }
}