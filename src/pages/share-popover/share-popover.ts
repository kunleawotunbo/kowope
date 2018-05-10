import { Component } from '@angular/core';

import { App, NavController, ModalController, ViewController, NavParams } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';

@Component({
    template: `
    <ion-list no-lines detail-none>      
      <button ion-item (click)="whatsappShare()"><ion-icon class="share-icon" name="logo-whatsapp"></ion-icon> WhatsApp</button>
      <button ion-item (click)="twitterShare()"><ion-icon class="share-icon" name="logo-twitter"></ion-icon> Twitter</button>
      <button ion-item (click)="facebookShare()"><ion-icon class="share-icon" name="logo-facebook"></ion-icon> Facebook</button>
      <button ion-item (click)="smsShare()"><ion-icon class="share-icon" name="logo-sms"></ion-icon>SMS</button>
      <button ion-item (click)="otherShare()">Others</button>
    </ion-list>
  `
})
export class SharePopoverPage {

    msg: string;

    constructor(
        public viewCtrl: ViewController,
        public navCtrl: NavController,
        public app: App,
        public modalCtrl: ModalController,
        public socialSharing: SocialSharing,
        public navParams: NavParams
    ) {

        this.msg = this.navParams.get('msg');
    }

    support() {
        this.app.getRootNav().push('SupportPage');
        this.viewCtrl.dismiss();
    }

    close(url: string) {
        window.open(url, '_blank');
        this.viewCtrl.dismiss();
    }

    whatsappShare() {
        this.socialSharing.shareViaWhatsApp(this.msg, null /*Image*/, null)
            .then(() => {
                //alert("Success");
                this.viewCtrl.dismiss();
            },
                () => {
                    alert("failed")
                });
    }

    twitterShare() {
        this.socialSharing.shareViaTwitter(this.msg, null /*Image*/, null)
            .then(() => {
                // alert("Success");
                this.viewCtrl.dismiss();
            },
                () => {
                    alert("failed");
                });
    }

    facebookShare() {
        this.socialSharing.shareViaFacebook(this.msg, null /*Image*/, null)
            .then(() => {
                // alert("Success");
                this.viewCtrl.dismiss();
            },
                () => {
                    alert("failed")
                });
    }

    otherShare() {
        this.socialSharing.share(this.msg, null/*Subject*/, null/*File*/, null)
            .then(() => {
                // alert("Success");
                this.viewCtrl.dismiss();
            },
                () => {
                    alert("failed")
                });

    }

    smsShare() {
        this.socialSharing.shareViaSMS(this.msg,  null)
            .then(() => {
                // alert("Success");
                this.viewCtrl.dismiss();
            },
                () => {
                    alert("failed");
                });
    }
}