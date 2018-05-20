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
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  isReady: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadingCtrl: LoadingController, public authService: AuthService,
    private toastCtrl: ToastController, public utilityService: UtilityService,
    public menuCtrl: MenuController,
    public storage: Storage,
    public events: Events,
    public formBuilder: FormBuilder,
  ) {    

    this.initForm();
    
    // Get username/email stored in local storage and set it in the email field
    this.storage.get('username').then((username) => {
      //console.log("username :: " + username);
      if(username){
        this.form.controls['username'].setValue(username);
      } else {
        this.form.controls['username'].setValue('');
      }
      this.isReady = true;
    });
    

  }

  initForm(){

    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.username = this.form.controls['username'];
    this.password = this.form.controls['password'];
  }

  ionViewDidLoad() {

    // this.initForm();
    /*
    if (this.utilityService.isOnline()) {
      
    } else {
      this.alert = true;
      this.message = "Unable to connect to the internet. Please check your settings";
      this.loader.dismiss();
      this.utilityService.showNoNetworkAlert();
    }
    */
  }

  ionViewWillEnter(){
    // Remove adds on login age
    this.utilityService.removeBannerAds();
  }

  ionViewWillLeave(){
    this.utilityService.launchInterstitial();
  }

  facebookLogin(){

  }

  signupPage() {
    this.navCtrl.push('SignupPage');
  }
  forgotPasswordPage() {
    this.navCtrl.push('ForgotPasswordPage');

  }


  submitForm() {

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

  sigin(credentials) {

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

        var message = "";
        if (error.status === 401) {
          message = "Incorrect Username/Password";
        } else if (error.status === 500) {
          message = "Unable to login";
        } else {
          // message = error;
          console.log("error :: " + JSON.stringify(error));
          // message = JSON.stringify(error);
          message = 'Unable to login';
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
        this.storage.set('username', result.user.email);

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

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
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
