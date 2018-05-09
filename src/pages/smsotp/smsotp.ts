import { Component } from '@angular/core';
import { NavController, IonicPage, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { QuickbooksService } from '../../providers/quickbooks.service';
import { UtilityService } from '../../utility/utility.service';

@IonicPage()
@Component({
  selector: 'page-smsotp',
  templateUrl: 'smsotp.html'
})
export class SmsotpPage {

  mobile = '';
  currentUser: any;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public quickbooksService: QuickbooksService,
    public utilityService: UtilityService,
    public storage: Storage
  ) {

    this.storage.get('currentUser').then((currentUser) => {
      this.currentUser = JSON.parse(currentUser);
    });


  }

  sendOTP() {
    if (this.mobile.length != 14) {
      let alert = this.alertCtrl.create({
        title: 'Mobile Number Required!',
        subTitle: 'Please enter your 10 digit mobile number with +234 country code!',
        buttons: ['OK']
      });
      alert.present();
    }
    else {
      console.log('this.mobile :: ' + this.mobile);
      this.sendSMS(this.currentUser.id, this.mobile);
    }
  }

  sendSMS(userId, mobile) {
    this.utilityService.presentLoading();
    var result;
    this.quickbooksService.sendSMS(userId, mobile).subscribe(
      data => {
        result = data;
      },
      error => {
        console.log(error);
        console.log("Error - something went wrong");
        this.utilityService.loadingDismiss();
      },
      () => {
        //console.log("result :: " + result.txns);
        //this.txnsList = result.txns;
        //this.isLoaded = true;

        this.navCtrl.push('SmsOtpReceivePage', { mobileno: this.mobile })

        this.utilityService.loadingDismiss();
      });
  }

}
