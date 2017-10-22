import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the BackendServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BackendServiceProvider {
  serverStatus = {
    open: false,
    customers: 0
  };
  constructor(public http: Http) {
    console.log('Hello BackendServiceProvider Provider');
  }

  getServerStatus(cb){
    this.http.get('https://ahmed-smsm.herokuapp.com/status')
    .map(res => res.json())
    .subscribe(data => {
      console.log("http call data: "+data);
      cb(data.open,data.customers);
    })
  }
}
