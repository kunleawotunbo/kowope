import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html'
})
export class IntroPage {

    slides = [
        {
          title: "Welcome to Quickbooks!",
          description: "<b>Quickbooks</b> showcases a number of useful features that assist in rent management and services.",
          image: "assets/images/ica-slidebox-img-1.png",
          // image: "assets/images/bg-pattern2.png"
        },
        {
          title: "What is Quickbooks?",
          description: "<b>Quickbooks</b> is an app that allows tenant to pay their rent to landlords",
          image: "assets/images/ica-slidebox-img-2.png",
        },
        {
          title: "What does Owner enjoys?",
          description: "It offers <b>Fleet owners</b> the ability to manage and consolidate their properties.",
          image: "assets/images/ica-slidebox-img-3.png",
        }
  ];

  constructor(public navCtrl: NavController) {

  }

  goHome(){
      this.navCtrl.push('LoginPage');
  }

}
