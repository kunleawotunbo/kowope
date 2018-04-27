import { Component } from '@angular/core';
import { NavController, IonicPage, Platform, LoadingController } from 'ionic-angular';
import { QuickbooksService } from '../../providers/quickbooks.service';
import { UtilityService } from '../../utility/utility.service';

@IonicPage()
@Component({
  selector: 'page-fleetmgt',
  templateUrl: 'fleetmgt.html'
})
export class FleetmgtPage {
  vehiclesList: any;
  loader: any;
  sectionTab: string = "history"; startDate; endDate;
  isAndroid: boolean = false;
  isLoaded: boolean;
  subItemsList: Array<{ title: string, icon: string, component: any }>;

  constructor(public navCtrl: NavController, public quickbooksService: QuickbooksService,
    public loadingCtrl: LoadingController, platform: Platform,
    public utilityService: UtilityService
  ) {
    this.isAndroid = platform.is('android');
    this.getSubItemsList();
  }

  ionViewDidLoad() {
    // this.getVehiclesList();

  }

  getSubItemsList() {
    this.subItemsList = [
      { title: 'Vehicles', icon: 'car', component: 'VehiclePage' },
      { title: 'Drivers', icon: 'card', component: 'DriversPage' },
    ];
  }

  itemSelected(item) {

    /*
    this.navCtrl.push(item.component, {
      item: item
    });
    */

    if (this.utilityService.isOnline()) {
      this.navCtrl.push(item.component, {
        item: item
      });
    } else {
      this.utilityService.showNoNetworkAlert();
    }

  }

  getItems(type: any) {
    //return this.apps[type];
    this.isLoaded = false;

  }

  search() {
    this.startDate;
    this.endDate;

    // this.getTxnsList();
  }

  addVehicle() {
    this.navCtrl.push('AddvehiclePage');
  }

  getVehiclesList() {
    this.presentLoading();
    //this.utilityService.presentLoading();
    var result;
    this.quickbooksService.getVehiclesList().subscribe(
      data => {
        result = data;
      },
      error => {
        console.log(error);
        console.log("Error - something went wrong");
        this.loader.dismiss();
        //this.utilityService.loader.dismiss();
      },
      () => {
        this.vehiclesList = result.vehicles;
        this.isLoaded = true;
        this.loader.dismiss();
        //this.utilityService.loader.dismiss();
      });
  }

  /*
  getTxnsList(){
    this.presentLoading();
    var result;
    this.quickbooksService.getTxnsList().subscribe(
      data => {
        result = data;
      },
      error => {
        console.log(error);
        console.log("Error - something went wrong");
        this.loader.dismiss();
      },
      () => {
        //console.log("result :: " + result.txns);
        this.txnsList = result.txns;
        this.isLoaded = true;
        this.loader.dismiss();
      });
  }
  */


  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 30000
    });
    this.loader.present();
  }


}
