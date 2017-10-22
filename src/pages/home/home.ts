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

  presentToast(msg) {
    const toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  reload(){
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }
}
