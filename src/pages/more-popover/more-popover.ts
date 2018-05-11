import { Component } from '@angular/core';

import { App, NavController, ModalController, ViewController, NavParams } from 'ionic-angular';


@Component({
  template: `
    <ion-list no-lines>
      <button ion-item detail-none (click)="aboutUs()">About Us</button>
      <button ion-item detail-none (click)="contactUs()">Contact Us</button>
      <button ion-item detail-none (click)="close('http://tunbor.com')">Our Site</button>
      <button ion-item detail-none (click)="close('https://play.google.com/store/apps/details?id=com.tunbor.quickbooks')">Rate Us</button>
      <button ion-item detail-none (click)="support()">Support</button>
    </ion-list>
  `
})
export class MorePopoverPage {

    item: any;

  constructor(
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public app: App,
    public modalCtrl: ModalController,
    public navParams: NavParams
  ) {
      this.item = this.navParams.get('item');
   }

  support() {
    this.app.getRootNav().push('SupportPage');
    this.viewCtrl.dismiss();
  }

  aboutUs() {
    this.app.getRootNav().push('SupportPage');
    this.viewCtrl.dismiss();
  }

  contactUs() {
    this.app.getRootNav().push('ContactUsPage');
    this.viewCtrl.dismiss();
  }

  close(url: string) {
    window.open(url, '_blank');
    this.viewCtrl.dismiss();
  }
}