import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { baseUrl } from './global.service';

export function getTokenOptions(): RequestOptions{
    let headers = new Headers();
    let jwt = 'Bearer ' + localStorage.getItem('currentToken');
    headers.append('Authorization', jwt);
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return options;
}
 
@Injectable()
export class AuthenticationService {
    public token: string;
 
    constructor(private http: Http) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }
 
    login(value): Observable<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(baseUrl + `login`, JSON.stringify({ login: value}), options)
            .map((response: Response) => {
                let error = response.json() && response.json().error;
                let token = response.json() && response.json().jwt;
                let username = response.json() && response.json().user && response.json().user.username;
                let perms = response.json() && response.json().perms;
              
                 if (!error && token && username && perms) {
                    this.token = token;
                    localStorage.setItem('currentToken', token);
                    localStorage.setItem('currentUsername', username);
                    localStorage.setItem('currentPerms', perms);
                    console.log("valid login!")
                    return true;
                } else {
                    console.log("invalid login!")
                    return false;
                }
            });
    }
}

    