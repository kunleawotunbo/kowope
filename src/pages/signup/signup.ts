import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  @ViewChild(Slides) slides: Slides;
  items = [
    'LANDLORD',
    'TENANT',
    'VIEW'    
  ]; 

  constructor(public navCtrl: NavController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserSignup');
    //this.slides.lockSwipes(true);
  }

  goToSlide() {
    this.slides.slideTo(2, 500);
  }

  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    console.log('Current index is', currentIndex);
  }

  slideNext(){
    let currentIndex = this.slides.getActiveIndex();
    let nextSlideIndex = currentIndex + 1;
    this.slides.slideTo(nextSlideIndex, 500);
  }
  slidePrevious(){
    let currentIndex = this.slides.getActiveIndex();
    let nextSlideIndex = currentIndex - 1;
    this.slides.slideTo(nextSlideIndex, 500);
  }

  dashboardPage(){ 
    this.navCtrl.push('HomePage'); 
  }
  loginPage(){ 
    this.navCtrl.push('LoginPage');
  }
  forgotPasswordPage(){ 
    this.navCtrl.push('ForgotPasswordPage');  
  }

  itemSelected(item: string) {
    console.log("Selected Item", item);
    let currentIndex = this.slides.getActiveIndex();
    let nextSlideIndex = currentIndex + 1;
    this.slides.slideTo(nextSlideIndex, 500);
    
  }

  signup(){

  }

}
