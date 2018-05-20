import { Component, ViewChild } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, AbstractControl, FormControl } from '@angular/forms';
import { UtilityService } from '../../utility/utility.service';
import { AuthService } from '../../providers/auth-service';
import { UsernameValidator } from './usernamevalidator';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  private form: FormGroup;
  //public firstName: AbstractControl; lastName; phoneNo; address; userType; email; password; confirmPassword;
  //public accepterms: AbstractControl;

  @ViewChild('signupSlider') signupSlider: any;

  slideOneForm: FormGroup;
  slideTwoForm: FormGroup;

  submitAttempt: boolean = false;
  firstSlide: boolean;
  lastSlide: boolean;

  //firstName: FormControl;

  constructor(
    public navCtrl: NavController,
    public authService: AuthService,
    public formBuilder: FormBuilder,
    public utilityService: UtilityService,
    public usernameValidator: UsernameValidator
  ) {

    /*
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNo: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      accepterms: [false, Validators.required]
      
    },{
      validator: matchingPasswords('password', 'confirmPassword')
    });

    this.firstName = this.form.controls['firstName'];
    this.lastName = this.form.controls['lastName'];
    this.phoneNo = this.form.controls['phoneNo'];
    this.address = this.form.controls['address'];    
    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
    this.confirmPassword = this.form.controls['confirmPassword'];
    this.accepterms = this.form.controls['accepterms'];

    */

    this.slideOneForm = formBuilder.group({
      firstName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      lastName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      phoneNo: ['', Validators.required]
    });

    this.slideTwoForm = formBuilder.group({
      address: ['', Validators.required],
      // email: [''],
      email: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z]*'), Validators.required]), usernameValidator.checkUsername.bind(usernameValidator)],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      accepterms: [false, Validators.required]
    }, {
        validator: matchingPasswords('password', 'confirmPassword')
      });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserSignup');
  }

  ionViewWillEnter() {
    let currentIndex = this.signupSlider.getActiveIndex();
    console.log('Current index is', currentIndex);
    if (this.signupSlider.signupSlider) {
      this.firstSlide = true;
    }
  }

  next() {
    this.signupSlider.slideNext();
  }

  prev() {
    this.signupSlider.slidePrev();
  }

  save() {
    this.submitAttempt = true;

    if (!this.slideOneForm.valid) {
      this.signupSlider.slideTo(0);
    } else if (!this.slideTwoForm.valid) {
      this.signupSlider.slideTo(1);
    } else {
      console.log("Success !!");
      console.log("slideOneForm", this.slideOneForm.value);
      console.log("slideTwoForm", this.slideTwoForm.value);
    }
  }

  slideChanged() {
    let currentIndex = this.signupSlider.getActiveIndex();
    console.log('Current index is', currentIndex);
    /*
    if (currentIndex === 0){
      this.firstSlide = true;
    } else {
      this.firstSlide = false;
    }
    */
    if (this.signupSlider.isBeginning()) {
      this.firstSlide = true;
    } else {
      this.firstSlide = false;
    }

    if (this.signupSlider.isEnd){
      this.lastSlide = true;
    } else {
      this.lastSlide = false;
    }
  }

  dashboardPage() {
    this.navCtrl.push('HomePage');
  }
  loginPage() {
    this.navCtrl.push('LoginPage');
  }
  forgotPasswordPage() {
    this.navCtrl.push('ForgotPasswordPage');
  }

  /*
  submitForm(values: any) {
    //  Check if form is valid

    if (!this.accepterms.value) {
      this.utilityService.showNotification('Please accept terms and conditions');
      return false;
    }
    if (this.form.valid) {
      var userType = "2"; // driver
      this.signUp(this.firstName.value, this.lastName.value,
        this.phoneNo.value,
        this.address.value, userType, this.email.value, this.password.value);

      this.form.reset();
    }

  }
  */

  signUp(first_name, last_name, phone_no, address, user_type, email, password) {

    this.utilityService.presentLoading();
    var result;
    this.authService.signUp(first_name, last_name, phone_no, address, user_type, email, password)
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
          this.utilityService.showNotification("User created successfully");
        }
      );


  }

  terms() {
    this.navCtrl.push('TermsPage');
  }

}


export function matchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
  return (group: FormGroup) => {
    const password = group.controls[passwordKey];
    const passwordConfirmation = group.controls[passwordConfirmationKey];
    if (password.value !== passwordConfirmation.value) {
      return passwordConfirmation.setErrors({ mismatchedPasswords: true })
    }
  }
}