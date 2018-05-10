import { Component } from '@angular/core';

import { App, NavController, ModalController, ViewController } from 'ionic-angular';


@Component({
  template: `
    <ion-list>
      <button ion-item detail-none (click)="close('http://tunbor.com')">Our Site</button>
      <button ion-item detail-none (click)="close('https://play.google.com/store/apps/details?id=com.tunbor.quickbooks')">Rate Us</button>
      <button ion-item detail-none (click)="support()">Support</button>
    </ion-list>
  `
})
export class GpslocationPopoverPage {

  constructor(
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public app: App,
    public modalCtrl: ModalController
  ) { }

  support() {
    this.app.getRootNav().push('SupportPage');
    this.viewCtrl.dismiss();
  }

  close(url: string) {
    window.open(url, '_blank');
    this.viewCtrl.dismiss();
  }
}