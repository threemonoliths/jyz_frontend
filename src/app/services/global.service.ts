import { Injectable } from '@angular/core';
import { deepIndexOf } from '../utils/utils';

export const baseUrl='http://localhost:4000/api/v1/';
// export const baseUrl='http://172.27.21.133:4000/api/v1/';



@Injectable()
export class GlobalService {

  constructor() {}

  public title : String;

  breadcrumbItems = [{label: "首页", routerLink: "/layout/content/dashboard"}]

  public setTitle(t: string) {
    this.title = t
  }

  public addBreadcrumbItem(c) {
    if (this.breadcrumbItems.length > 5){
      this.breadcrumbItems.splice(0,1);
    }
    let index = deepIndexOf(this.breadcrumbItems,c)
    if (index == -1){
      this.breadcrumbItems.push(c);
    } else {
      let newc = this.breadcrumbItems[index];
      this.breadcrumbItems.splice(index,1);
      this.breadcrumbItems.push(newc);
    }
  }

}
