import { Component } from '@angular/core';
import { NavController, IonicPage, App, LoadingController, ToastController } from 'ionic-angular';
import { UtilityService } from '../../utility/utility.service';

declare var PaystackPop: any;

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html'
})
export class PaymentPage {

  loading: any;
  isLoggedIn: boolean = false;

  balancePercent: number;

  // current: number = 35;
  // max: number = 100;
  current: number = 0;
  max: number = 0;
  stroke: number = 15;
  radius: number = 125;
  semicircle: boolean = false;
  rounded: boolean = false;
  responsive: boolean = false;
  clockwise: boolean = true;
  color: string = '#3BB9FF';
  background: string = '#eaeaea';
  duration: number = 800;
  animation: string = 'easeOutCubic';
  animationDelay: number = 0;
  animations: string[] = [];
  gradient: boolean = false;
  realCurrent: number = 0;

  constructor(public navCtrl: NavController,
    //public authService: AuthService,
    public app: App, public loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    public utilityService: UtilityService,
  ) {


    this.calValue();
  }

  ionViewDidLoad() {
    //this.getUserList();
  }

  doSomethingWithCurrentValue(event) {

  }

  increment(amount = 1) {
    this.current += amount;
  }

  /**
   * round-progress bar
   * https://github.com/crisbeto/angular-svg-round-progressbar
   */
  getOverlayStyle() {
    let isSemi = this.semicircle;
    let transform = (isSemi ? '' : 'translateY(-50%) ') + 'translateX(-50%)';

    return {
      'top': isSemi ? 'auto' : '50%',
      'bottom': isSemi ? '5%' : 'auto',
      'left': '50%',
      'transform': transform,
      '-moz-transform': transform,
      '-webkit-transform': transform,
      'font-size': this.radius / 3.5 + 'px'
    };
  }

  calValue() {
    //var result = (35.8 / 100) * 10000;
    var rentAmount = 400000;
    var amountPaid = 150000;

    // Get percentage paid
    var result = (amountPaid / rentAmount) * 100;

    this.max = 100;
    this.current = result;
    this.balancePercent = 100 - this.current;

    //this.number = 100;
  }


  showLoader() {

    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
    });

    this.loading.present();

  }



  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom',
      dismissOnPageChange: true
    });

    toast.present();
  }

  makePayment() {
    if (this.utilityService.isOnline()) {
      var publicKey = 'pk_test_abcd9d53c2457dc94e59d41e131439006dc7fa7c';
      var email = 'customer@email.com';
      var amount = 10000;
      var referenceNo = '' + Math.floor((Math.random() * 1000000000) + 1);
      var displayName = "Mobile Number";
      var variableName: "mobile_number";
      var customValue = "+2348012345678";

      this.payWithPaystack(publicKey, email, amount, referenceNo, displayName, variableName, customValue);
    } else {
      this.utilityService.showNoNetworkAlert();
    }
  }

  payWithPaystack(publicKey, email, amount, referenceNo, displayName, variableName, customValue) {
    // var paystackIframeOpened = false;
    this.utilityService.presentLoading();
    // console.log("About to open");
    var handler = PaystackPop.setup({
      key: publicKey,
      email: email,
      amount: amount,
      ref: referenceNo, // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
      metadata: {
        custom_fields: [
          {
            display_name: displayName,
            variable_name: variableName,
            value: customValue
          }
        ]
      },
      callback: function (response) {
        //this.utilityService.loadingDismiss();
        console.log("response :: " + JSON.stringify(response));
        alert('success. transaction ref is ' + response.reference);
      },
      onClose: function () {
        //paystackIframeOpened = false;        
        //this.utilityService.loadingDismiss();
        alert('window closed');
      }
    });
    // Payment Request Just Fired  
    handler.openIframe();
    // console.log("i am opened");
    //paystackIframeOpened = true;

    // set timer to disable loading

  }

  /*
  payWithPaystack() {
    // var paystackIframeOpened = false;
    this.utilityService.presentLoading();
    // console.log("About to popen");
    var handler = PaystackPop.setup({
      key: 'pk_test_abcd9d53c2457dc94e59d41e131439006dc7fa7c',
      email: 'customer@email.com',
      amount: 10000,
      ref: '' + Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
      metadata: {
        custom_fields: [
          {
            display_name: "Mobile Number",
            variable_name: "mobile_number",
            value: "+2348012345678"
          }
        ]
      },
      callback: function (response) {
        this.utilityService.loadingDismiss();
        alert('success. transaction ref is ' + response.reference);
      },
      onClose: function () {
        //paystackIframeOpened = false;        
        this.utilityService.loadingDismiss();
        alert('window closed');
      }
    });
    // Payment Request Just Fired  
    handler.openIframe();
    // console.log("i am opened");
    //paystackIframeOpened = true;

    // set timer to disable loading

  }
  */

  loadImage() {
    alert("Image is loaded");
  }



  /*
  payWithPaystack(){
    var handler = PaystackPop.setup({
      key: 'pk_test_abcd9d53c2457dc94e59d41e131439006dc7fa7c',
      email: 'customer@email.com',
      amount: 10000,
      ref: ''+Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
      metadata: {
         custom_fields: [
            {
                display_name: "Mobile Number",
                variable_name: "mobile_number",
                value: "+2348012345678"
            }
         ]
      },
      callback: function(response){       
          alert('success. transaction ref is ' + response.reference);
      },
      onClose: function(){
          alert('window closed');
      }
    });
    handler.openIframe();
  }
  */
}
