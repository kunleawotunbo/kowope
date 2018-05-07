import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';

@IonicPage()
@Component({
  selector: 'page-ussd',
  templateUrl: 'ussd.html'
})
// https://forum.ionicframework.com/t/dialing-ussd-with-ionic2/73127/4
export class UssdPage {

  constructor(
    public navCtrl: NavController,
    private callNumber: CallNumber
  ) {

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
     this.callNumber.callNumber(passedNumber, true)
      .then((data) => {
        console.log('Launched dialer!'+ data);
      })
      .catch(() => console.log('Error launching dialer'));
  }

}
