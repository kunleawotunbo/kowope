import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { UtilityService } from '../../utility/utility.service';

@IonicPage()
@Component({
    selector: 'page-forgotpassword',
    templateUrl: 'forgotpassword.html'
})
export class ForgotPasswordPage {

    constructor(public navCtrl: NavController) {

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad UserLogin');
    }

    dashboardPage() {
        this.navCtrl.push('HomePage');
    }
    loginPage() {
        this.navCtrl.push('LoginPage');
    }
    signupPage() {
        this.navCtrl.push('SignupPage');
    }

}
