import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams } from 'ionic-angular';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { QuickbooksService } from '../../providers/quickbooks.service';
import { UtilityService } from '../../utility/utility.service';

declare var SMS: any;
declare var document: any;

// https://ampersandacademy.com/tutorials/ionic-framework-3/automate-sms-otp-verification-using-ionic3-with-nexmo-part2
@IonicPage()
@Component({
  selector: 'page-smsotpreceive',
  templateUrl: 'smsotpreceive.html'
})
export class SmsOtpReceivePage {

  otp = '';
  mobile = '';

  constructor(public navCtrl: NavController,
    public androidPermissions: AndroidPermissions,
    public navParams: NavParams,
    public utilityService: UtilityService,
    public quickbooksService: QuickbooksService
  ) {

    this.mobile = this.navParams.get('mobile');

    document.addEventListener('onSMSArrive', function (e) {
      var sms = e.data;

      console.log("received sms " + JSON.stringify(sms));

      if (sms.address == 'HP-611773') //look for your message address
      {
        this.otp = sms.body.substr(0, 4);
        this.stopSMS();
        this.verify_otp();
      }



    });
    this.checkPermission();
  }

  //}

  checkPermission() {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_SMS).then(
      success => {

        //if permission granted
        this.receiveSMS();
      },
      err => {

        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_SMS).
          then(success => {
            this.receiveSMS();
          },
            err => {
              console.log("cancelled")
            });
      });

    this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.READ_SMS]);

  }

  receiveSMS() {

    if (SMS) SMS.startWatch(function () {
      console.log('watching started');
    }, function () {
      console.log('failed to start watching');
    });
  }
  stopSMS() {
    if (SMS) SMS.stopWatch(function () {
      console.log('watching stopped');
    }, function () {
      console.log('failed to stop watching');
    });
  }

  verifyOTP(mobileNo, otp) {
    this.utilityService.presentLoading();
    var result;
    this.quickbooksService.verifyOTP(mobileNo, otp).subscribe(
      data => {
        result = data;
      },
      error => {
        console.log(error);
        console.log("Error - something went wrong");
        this.utilityService.loadingDismiss();
      },
      () => {
        console.log("result :: " + result);
        //this.txnsList = result.txns;
        //this.isLoaded = true;

        //this.navCtrl.push('OtpReceivePage',{mobileno:this.mobile})

        this.utilityService.loadingDismiss();
      });
  }

}
