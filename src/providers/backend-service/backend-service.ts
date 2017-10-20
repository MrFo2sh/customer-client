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
  // getServerStatus(){
  //   return new Promise(resolve=>{
  //     this.http.get('http://localhost:3000/status')
  //     .map(res => res.json())
  //     .subscribe(data => {
  //       this.serverStatus.open = data.open;
  //       this.serverStatus.customers = data.customers;
  //       resolve(this.serverStatus);
  //     });
  //   });
  // }

  getServerStatus(cb){
    this.http.get('http://localhost:3000/status')
    .map(res => res.json())
    .subscribe(data => {
      console.log("http call data: "+data);
      cb(data.open,data.customers);
    })
  }

  // updateCustomer(value){
  //   return new Promise(resolve=>{
  //     this.http.post('http://localhost:3000/customerupdate',{value:value})
  //     .map(res=>res.json)
  //     .subscribe(data=>{
  //       console.log(data);
  //       resolve(data);
  //     })
  //   })
  // }

  updateCustomer(value,cb){
    this.http.post('http://localhost:3000/customerupdate',{value:value})
    .map(res=>res.json)
    .subscribe(data=>{
      console.log(data);
      if(data){
       cb(true);
      }else{
        cb(false);
      }
    })
  }

  // updateServerStatus(){
  //   return new Promise(resolve=>{
  //     this.http.get('http://localhost:3000/updatestatus')
  //     .map(res => res.json())
  //     .subscribe(data => {
  //       console.log("http call data: "+data);
  //       resolve(data.open);
  //     });
  //   });
  // }

  updateServerStatus(cb){
    this.http.get('http://localhost:3000/updatestatus')
    .map(res => res.json())
    .subscribe(data => {
      console.log("http call data: "+data);
      cb(data.open);
    });
  }
}
