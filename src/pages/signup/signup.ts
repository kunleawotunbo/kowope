import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { UtilityService } from '../../utility/utility.service';
import { AuthService } from '../../providers/auth-service';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  private form: FormGroup;
  public firstName: AbstractControl; lastName; phoneNo; address; userType; email; password;

  constructor(
    public navCtrl: NavController,
    public authService: AuthService,    
     public formBuilder: FormBuilder, 
    public utilityService: UtilityService
  ) {

    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNo: ['', Validators.required],
      address: ['', Validators.required],
      //driverId: ['', Validators.required],
      //userType: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.firstName = this.form.controls['firstName'];
    this.lastName = this.form.controls['lastName'];
    this.phoneNo = this.form.controls['phoneNo'];
    this.address = this.form.controls['address'];
    this.userType = this.form.controls['userType'];
    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserSignup');
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

  submitForm(){
    //  Check if form is valid
    this.signUp(this.firstName.value, this.lastName.value,
      this.phoneNo.value,
     this.address.value,this.userType.value, this.email.value, this.password.value);
  }

  signUp(first_name, last_name, phone_no, address, user_type, email, password){

    this.utilityService.presentLoading();
    var result;
    // (first_name, last_name, phone_no, address, user_type, email, password) {
    this.authService.signUp(this.firstName.value, this.lastName.value,
       this.phoneNo.value,
      this.address.value,this.userType.value, this.email.value, this.password.value
    ).map((response: Response) => response).subscribe(
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
        this.utilityService.showNotification("User created successfully");
      }
    );
    

  }

}
