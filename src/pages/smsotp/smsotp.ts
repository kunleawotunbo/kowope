import { Component } from '@angular/core';
import { NavController, IonicPage, AlertController  } from 'ionic-angular';
import { QuickbooksService } from '../../providers/quickbooks.service';
import { UtilityService } from '../../utility/utility.service';

@IonicPage()
@Component({
  selector: 'page-smsotp',
  templateUrl: 'smsotp.html'
})
export class SmsotpPage {

  mobile = ''; 
  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public quickbooksService: QuickbooksService,
    public utilityService: UtilityService
  ) {

  }

  sendOTP(){
    if(this.mobile.length!=14)
      {
        let alert = this.alertCtrl.create({
          title: 'Mobile Number Required!',
          subTitle: 'Please enter your 10 digit mobile number with +234 country code!',
          buttons: ['OK']
        });
        alert.present();
      }
      else
      {
        this.sendSMS(this.mobile);
      }
  }

  sendSMS(mobile){
    this.utilityService.presentLoading();
    var result;
    this.quickbooksService.sendSMS(mobile).subscribe(
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

        this.navCtrl.push('SmsOtpReceivePage',{mobileno:this.mobile})

        this.utilityService.loadingDismiss();
      });
  }

}
