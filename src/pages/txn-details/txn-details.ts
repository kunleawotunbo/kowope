import { Component } from '@angular/core';
import { NavController, IonicPage, Platform, NavParams, LoadingController } from 'ionic-angular';
import { QuickbooksService } from '../../providers/quickbooks.service';
import { UtilityService } from '../../utility/utility.service';


@IonicPage()
@Component({
  selector: 'page-txn-details',
  templateUrl: 'txn-details.html'
})
export class TxndetailsPage {
  txnDetails: any;
  loader: any;
  item: any;  
  isLoaded: boolean;

  constructor(public navCtrl: NavController, public quickbooksService: QuickbooksService,
    public loadingCtrl: LoadingController, platform: Platform, public navParams: NavParams,
    public utilityService: UtilityService
  ) {
    this.item = navParams.get('item');
    console.log("item.id :: " + this.item.id);
  }

  ionViewDidLoad() {
    this.getTxnById(this.item.id);
  }

  itemSelected(item){

  }

  addTxn(){
    this.navCtrl.push('AddtxnPage');
  }

  goBack(){
    //this.navCtrl.push('JournalsPage');
    this.navCtrl.pop();
  }

  getTxnById(txnId){
    this.utilityService.presentLoading();
    var result;
    this.quickbooksService.getTxnById(txnId).subscribe(
      data => {
        result = data;
      },
      error => {
        console.log(error);
        console.log("Error - something went wrong");
        this.utilityService.loader.dismiss();
      },
      () => {
        this.txnDetails = result.txn;
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
