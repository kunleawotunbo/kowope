import { Component } from '@angular/core';
import { NavController, IonicPage, LoadingController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { QuickbooksService } from '../../providers/quickbooks.service';
import { UtilityService } from '../../utility/utility.service';

@IonicPage()
@Component({
  selector: 'page-addtxn',
  templateUrl: 'addtxn.html'
})
export class AddtxnPage {
  txnsList: any;
  loader: any; vehiclesList
  private form: FormGroup;
  public amount: AbstractControl; narrative; vehicleId; txnType; date;
  public isLoaded: boolean;
 
  constructor(public navCtrl: NavController, public quickbooksService: QuickbooksService,
    public loadingCtrl: LoadingController, public formBuilder: FormBuilder,
    public utilityService: UtilityService

  ) {
    //this.presentLoading();
    this.form = this.formBuilder.group({
      amount: ['', Validators.required],
      vehicleId: ['', Validators.required],
      txnType: ['', Validators.required],
      date: ['', Validators.required],
      narrative: ['', Validators.required]
    });

    this.amount = this.form.controls['amount'];
    this.vehicleId = this.form.controls['vehicleId'];
    this.txnType = this.form.controls['txnType'];
    this.date = this.form.controls['date'];
    this.narrative = this.form.controls['narrative'];
  }

  ionViewDidLoad() {
    this.getVehiclesList();
  }

  itemSelected(item){

  }

  goBack(){
    //this.navCtrl.push('JournalsPage');
    this.navCtrl.pop();
  }

  getVehiclesList(){
    this.utilityService.presentLoading();
    var result;
    this.quickbooksService.getVehiclesList().subscribe(
      data => {
        result = data;
      },
      error => {
        console.log(error);
        console.log("Error - something went wrong");
        this.utilityService.loadingDismiss();
      },
      () => {
        this.vehiclesList = result.vehicles;
        this.isLoaded = true;
        this.utilityService.loadingDismiss();
      });
  }

  submitForm(){
    this.utilityService.presentLoading();
    if (this.utilityService.isOnline()) {
      this.newTxn(this.vehicleId.value, this.amount.value,
        this.txnType.value, this.date.value,this.narrative.value);
    
      // reset form
      this.form.reset();
    } else {
      this.utilityService.showNoNetworkAlert();
    }

  }

  newTxn(vehicleId, amount, txnType, date, narrative){
    var result;
    this.quickbooksService.newTxn(vehicleId, amount, txnType, date, narrative)
    .map((response: Response) => response).subscribe(
      data => {
        result = data;
      },
      error => {
        console.log(error);
        this.utilityService.loader.dismiss();
      },
      () => {
        //console.log("result :: "  + result);
        this.utilityService.loader.dismiss();
        this.utilityService.showNotification(result.message);
      }
    );
  }
  getTxnsList(){
    this.utilityService.presentLoading();
    var result;
    this.quickbooksService.getTxnsList().subscribe(
      data => {
        result = data;
      },
      error => {
        console.log(error);
        console.log("Error - something went wrong");
        this.utilityService.loader.dismiss();
      },
      () => {
        //console.log("result :: " + result.txns);
        this.txnsList = result.txns;
        this.utilityService.loader.dismiss();
      });
  }

  /*
  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    this.loader.present();
  }
  */

}
