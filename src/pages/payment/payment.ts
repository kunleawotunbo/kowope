import { Component } from '@angular/core';
import { NavController, IonicPage, App, LoadingController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { UtilityService } from '../../utility/utility.service';
import generateReferenceNo from '../../utility/generateReferenceNo';
import { QuickbooksService } from '../../providers/quickbooks.service';
import { ConfigService } from '../../utility/config.service';


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
  currentUser: any;
  form: FormGroup;
  public amount: AbstractControl;

  constructor(public navCtrl: NavController,
    //public authService: AuthService,
    public app: App, public loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    public utilityService: UtilityService,
    public quickbooksService: QuickbooksService,
    public storage: Storage,
    public configService: ConfigService,
    public formBuilder: FormBuilder,
  ) {


    this.calValue();
    this.storage.get('currentUser').then((currentUser) => {
     // console.log("currentUser :: " + currentUser);
      this.currentUser = JSON.parse(currentUser);

      //console.log("this.currentUser insdie :: " + this.currentUser);
    });

    //console.log("this.currentUser up:: " + this.currentUser);
    this.form = this.formBuilder.group({
      amount: ['', Validators.required]
    });

    this.amount = this.form.controls['amount'];
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
      var publicKey = this.configService.getPayStackPublicKey();
      var email = this.currentUser.email;
      //var amount = 100 * 100; // Multiply by 100 i.e send value in kobo
      var amount = this.amount.value * 100; // Multiply by 100 i.e send value in kobo
      var referenceNo = generateReferenceNo(10, ['alpha', 'number']);
      var displayName = this.currentUser.first_name + " " +this.currentUser.last_name;
      var variableName: "mobile_number";
      var customValue = this.currentUser.phone_no;
      var userId = this.currentUser.id;
      var paymentType = '1';
      var cart_id = paymentType;

      this.payWithPaystack(publicKey, email, amount, referenceNo, displayName, variableName, customValue, cart_id);
      
      this.initiateTxnToBackend(userId, email, referenceNo, amount);

      this.form.reset();
    } else {
      this.utilityService.showNoNetworkAlert();
    }
  }

  payWithPaystack(publicKey, email, amount, referenceNo, displayName, variableName, customValue, cart_id) {
    // var paystackIframeOpened = false;
    this.utilityService.presentLoading();
    // console.log("About to open");
    var handler = PaystackPop.setup({
      key: publicKey,
      email: email,
      amount: amount,
      ref: referenceNo, // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
      firstname: this.currentUser.first_name,
      lastname: this.currentUser.last_name,
      metadata: {
        cart_id:  cart_id,
        custom_fields: [
          {
            display_name: displayName,
            variable_name: variableName,
            value: customValue,
            cart_id:  cart_id
          }
        ]
      },
      /*
      callback: function (response) {
        //this.utilityService.loadingDismiss();
        console.log("response :: " + JSON.stringify(response));
        //alert('success. transaction ref is ' + response.reference);
        console.log("this.currentUser :: " + this.currentUser);
        console.log("this.currentUser.id :: " + this.currentUser.id);
        this.verifyTransaction(response.reference, this.currentUser.id);
      },
      onClose: function () {
        //paystackIframeOpened = false;        
        //this.utilityService.loadingDismiss();
        alert('window closed');
      }
      */
      callback: (response) => {
        //this.utilityService.loadingDismiss();
        console.log("response :: " + JSON.stringify(response));
        //alert('success. transaction ref is ' + response.reference);
        console.log("this.currentUser :: " + this.currentUser);
        console.log("this.currentUser.id :: " + this.currentUser.id);
        this.verifyTransaction(response.reference, this.currentUser.id);
      },
      onClose:  () => {
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

  initiateTxnToBackend(userId, userEmail, txnReference, amount) {
    this.utilityService.presentLoading();

    var result;
    this.quickbooksService.initiateTxn(userId, userEmail, txnReference, amount)
      .map((response: Response) => response).subscribe(
      data => {
        result = data;
      },
      error => {
        console.log(error);
        this.utilityService.loadingDismiss();
      },
      () => {
        //console.log("result :: "  + result);
        // this.loader.dismiss();
        this.utilityService.loadingDismiss();
        //this.utilityService.showNotification("Payment initiated");
      }
      );
  }

  /**
   * Verify transaction before giving value
   */
  verifyTransaction(transactionRef, userId) {
    this.utilityService.presentLoading();

    var result;
    this.quickbooksService.verifyTransaction(transactionRef, userId)
      .map((response: Response) => response).subscribe(
      data => {
        result = data;
      },
      error => {
        console.log(error);
        this.utilityService.loadingDismiss();
      },
      () => {
        console.log("result :: "  + result);
        this.utilityService.loadingDismiss();
        this.utilityService.showNotification(result.message);
      }
      );
  }

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
