import { BackendServiceProvider } from './../../providers/backend-service/backend-service';
import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  open:boolean;
  working:string;
  customers:number;
  workingColor:string;
  constructor(public toastCtrl:ToastController,public be:BackendServiceProvider,public navCtrl: NavController) {
    this.be.getServerStatus((open,customers)=>{
      this.open = open;
      this.customers = customers;
      if(open){
        this.working = "Working";
        this.workingColor = "secondary"
      }else{
        this.working = "Closed";
        this.workingColor = "danger";
      }
    });
  }

  updateServerStatus(){
    this.be.updateServerStatus((open)=>{
      this.open = open;
      if(open){
        this.working = "Working";
        this.customers = 0;
        this.workingColor = "secondary"
      }else{
        this.working = "Closed";
        this.customers = 0;
        this.workingColor = "danger";
      }
    });
  }

  subCustomer(){
    if(this.open && this.customers>0){
      this.be.updateCustomer(-1,(success)=>{
        if(success){
          this.customers-=1;
        }else{
          this.presentToast("Error occured");
        }
      })
    }
  }

  addCustomer(){
    if(this.open){
      this.be.updateCustomer(1,(success)=>{
        if(success){
          this.customers+=1;
        }else{
          this.presentToast("Error occured");
        }
      })
    }
  }

  presentToast(msg) {
    const toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

}
