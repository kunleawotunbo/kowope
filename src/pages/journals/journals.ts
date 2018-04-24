import { Component } from '@angular/core';
import { NavController, IonicPage, Platform } from 'ionic-angular';
import { QuickbooksService } from '../../providers/quickbooks.service';
import { LoadingController } from 'ionic-angular';
import { UtilityService } from '../../utility/utility.service';

@IonicPage()
@Component({
  selector: 'page-journals',
  templateUrl: 'journals.html'
})
export class JournalsPage {

  txnsList: any;
  loader: any;
  sectionTab: string = "history"; startDate; endDate;
  isAndroid: boolean = false;
  isLoaded: boolean;

  constructor(public navCtrl: NavController, public quickbooksService: QuickbooksService,
    public loadingCtrl: LoadingController, platform: Platform,
    public utilityService: UtilityService
  ) {
    this.isAndroid = platform.is('android');
   // this.presentLoading();
  }

  ionViewDidLoad() {
    this.getTxnsList();
  }

  itemSelected(item){
    this.navCtrl.push('TxndetailsPage', {
      item: item
    });
  }

  getItems(type: any) {
    //return this.apps[type];
    this.isLoaded = false;
    
  }

  search(){
    this.startDate;
    this.endDate;

   // this.getTxnsList();
  }

  addTxn(){
    this.navCtrl.push('AddtxnPage');
    /*this.navCtrl.push('GameSectionPage', {
      item: this.item
    });
    */
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
        this.isLoaded = true;
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
