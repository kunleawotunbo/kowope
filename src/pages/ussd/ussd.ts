import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';

declare var jquery: any;
declare var $: any;

@IonicPage()
@Component({
  selector: 'page-ussd',
  templateUrl: 'ussd.html'
})
// https://forum.ionicframework.com/t/dialing-ussd-with-ionic2/73127/4
export class UssdPage {

  phoneNumber: number;
  phoneNumber2: number;

  constructor(
    public navCtrl: NavController,
    private callNumber: CallNumber
  ) {
    this.intializeIntlTelInput();
  }

  callIt(passedNumber){
    /*
    this.callNumber.callNumber(passedNumber, true)
      .then((data) => {
        console.log('Lauched dailer! :: ' + data);
      })
      .catch(() =>{
        console.log('Error launching dailer');
      });
      */
     console.log("passedNumber :: " + passedNumber);
     this.callNumber.callNumber(passedNumber, true)
      .then((data) => {
        console.log('Launched dialer!'+ data);
      })
      .catch(() => console.log('Error launching dialer'));
  }

   callPhoneNumber(){
     console.log("Phone number :: " + String(this.phoneNumber));
    this.callNumber.callNumber(String(this.phoneNumber), true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
  }

  intializeIntlTelInput(){
    // $('.title').slideToggle();
    $("#phoneNumber2").intlTelInput();
  }

}
