import { Component } from '@angular/core';
import {
  IonicPage, NavController, NavParams,
  LoadingController, ToastController, MenuController,
  Events
} from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { AuthService } from '../../providers/auth-service';
import { UtilityService } from '../../utility/utility.service';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loading: any;
  loginData: { username: '', password: '' };
  data: any; loader; currentUser
  public message: string; error
  form: FormGroup;
  public alert: boolean; isDeviceOnline;
  public username: AbstractControl; password;
  //username: string;
  //password: string; error;
  //loader: any;
  //currentUser: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadingCtrl: LoadingController, public authService: AuthService,
    private toastCtrl: ToastController, public utilityService: UtilityService,
    public menuCtrl: MenuController,
    public storage: Storage,
    public events: Events,
    public formBuilder: FormBuilder,
  ) {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.username = this.form.controls['username'];
    this.password = this.form.controls['password'];
  }

  ionViewDidLoad() {

    if (this.utilityService.isOnline()) {
      // this.getGameList();
    } else {
      this.alert = true;
      this.message = "Unable to connect to the internet. Please check your settings";
      this.loader.dismiss();
      this.utilityService.showNoNetworkAlert();
    }
  }

  // dashboardPage() {
  //   this.navCtrl.push('HomePage');
  // }
  signupPage() {
    this.navCtrl.push('SignupPage');
  }
  forgotPasswordPage() {
    this.navCtrl.push('ForgotPasswordPage');

  }


  submitForm(){
    
    //
    /*
    let credentials = {
      username: this.username,
      password: this.password
    };
    */

    let credentials = {
      username: this.username.value,
      password: this.password.value
    };
    
    if (this.utilityService.isOnline()) {
      this.sigin(credentials);
    } else {
      this.utilityService.showNoNetworkAlert();
    }
  }

  sigin(credentials){

    //this.showLoader();
    this.utilityService.presentLoading();
    // First clear localStorage
    //localStorage.clear();
    this.authService.clearStorage();

    var result;
    this.authService.signIn(credentials).subscribe(
      data => {
        result = data;
      },
      error => {
        console.log(error);
        //console.log("status :: " + error.status);
        //console.log("_body.error) :: " + error._body);

        var message = "";
        if (error.status === 401) {
          message = "Incorrect Username/Password";
        } else if (error.status === 500) {
          message = "Unable to login";
        } else {
          message = error;
        }
        this.utilityService.loadingDismiss();

        this.presentToast(message);
      },
      () => {
        // Login successful        

        // Determine logged in user type and menu to show in the app
       
        this.storage.set('currentUser', JSON.stringify(result.user));
        this.storage.set('token', result.token);
        localStorage.setItem('token', result.token);

        //Publish login event
        // Events is a publish-subscribe style event system for sending and responding 
        //to application-level events across your app.

        this.currentUser = result.user;
        //console.log("In Login page :: currentUser :: " + this.currentUser);
        this.events.publish('user:login', this.currentUser);
        //this.events.publish('user:login');

        
        //console.log("this.currentUser.user_type :: " + this.currentUser.user_type);
        var loggedInType = parseInt(this.currentUser.user_type);
        this.utilityService.determineMenu(loggedInType);

        this.utilityService.loadingDismiss();
        this.navCtrl.setRoot("HomePage");
      }
    );
  }

  showLoader() {

    this.loading = this.loadingCtrl.create({
      spinner: 'bubbles',
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

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }


}
