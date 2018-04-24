import { Component } from '@angular/core';
import { NavController, IonicPage, LoadingController, Refresher, ToastController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { QuickbooksService } from '../../providers/quickbooks.service';
import { UtilityService } from '../../utility/utility.service';

@IonicPage()
@Component({
  selector: 'page-vehicle',
  templateUrl: 'vehicle.html'
})
export class VehiclePage {
  txnsList: any;
  loader: any;
  vehiclesList: any;
  sectionTab: string = "history"; startDate; endDate;
  isAndroid: boolean = false;
  isLoaded: boolean;
  public modelNo: AbstractControl; plateNo; color; datePurchased; driverId;

 
  constructor(
    public navCtrl: NavController, 
    public quickbooksService: QuickbooksService,
    public loadingCtrl: LoadingController,
    public formBuilder: FormBuilder, 
    public utilityService: UtilityService,
    public toastCtrl: ToastController,

  ) {
    
  }

  ionViewDidLoad() {
    this.getVehiclesList();
  }

  itemSelected(item){

  }

  goBack(){
    //this.navCtrl.push('FleetmgtPage');
    this.navCtrl.pop();
  }

  addVehicle(){
    this.navCtrl.push('AddvehiclePage');
  }

  getVehiclesList(){
    //this.presentLoading();
    this.utilityService.presentLoading();
    var result;
    this.quickbooksService.getVehiclesList().subscribe(
      data => {
        result = data;
      },
      error => {
        console.log(error);
        console.log("Error - something went wrong");
        //this.loader.dismiss();
        this.utilityService.loadingDismiss();
      },
      () => {
        this.vehiclesList = result.vehicles;
        this.isLoaded = true;
        //this.loader.dismiss();
        this.utilityService.loadingDismiss();
      });
  }

  getTxnsList(){
    //this.presentLoading();
    this.utilityService.presentLoading();
    var result;
    this.quickbooksService.getTxnsList().subscribe(
      data => {
        result = data;
      },
      error => {
        console.log(error);
        console.log("Error - something went wrong");
        //this.loader.dismiss();
        this.utilityService.loadingDismiss();
      },
      () => {
        //console.log("result :: " + result.txns);
        this.txnsList = result.txns;
        //this.loader.dismiss();
        this.utilityService.loadingDismiss();
      });
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    this.loader.present();
  }

  doRefresh(refresher: Refresher) {
     // simulate a network request that would take longer
      // than just pulling from out local json file
      setTimeout(() => {
        refresher.complete();

        const toast = this.toastCtrl.create({
          message: 'Sessions have been updated.',
          duration: 3000
        });
        toast.present();
      }, 1000);
  }

}
