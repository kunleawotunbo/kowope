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
  sectionTab: string = "history"; startDate; endDate; currencyCode;
  isAndroid: boolean = false;
  isLoaded: boolean;

  constructor(public navCtrl: NavController, public quickbooksService: QuickbooksService,
    public loadingCtrl: LoadingController, platform: Platform,
    public utilityService: UtilityService
  ) {
    this.isAndroid = platform.is('android');
   // this.presentLoading();
   this.currencyCode = "&#x20A6;";
  }

  /**
   * Fired just once and caches the page in the DOM
   * So when back button is clicked, it won't be fired again
   */
  ionViewDidLoad() {
    /*
    if (this.utilityService.isOnline()) {
      this.getTxnsList();
    } else {
      this.utilityService.showNoNetworkAlert();
    }
    */
  }

  /**
   * Fired everytime the page are available before loading
   * Fired everytime even when back button is clicked to this page
   */
  ionViewWillEnter(){
    if (this.utilityService.isOnline()) {
      this.getTxnsList();
    } else {
      this.utilityService.showNoNetworkAlert();
    }
  } 

  /*
  ngOnInit(){
    if (this.utilityService.isOnline()) {
      this.getTxnsList();
    } else {
      this.utilityService.showNoNetworkAlert();
    }
  }
  */

  itemSelected(item){
    
    if (this.utilityService.isOnline()) {
      this.navCtrl.push('TxndetailsPage', {
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
        this.utilityService.loadingDismiss();
      },
      () => {
        //console.log("result :: " + result.txns);
        this.txnsList = result.txns;
        this.isLoaded = true;
        this.utilityService.loadingDismiss();
      });
  }

  presentMorePopover(event: Event) {

    var item = 'Just for testing purpose';   

    this.utilityService.presentMorePopover(event, item);
  }

}
