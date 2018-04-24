import { Component } from '@angular/core';
import { NavController, IonicPage, Platform, LoadingController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Toast } from '@ionic-native/toast';
import { QuickbooksService } from '../../providers/quickbooks.service';
import { UtilityService } from '../../utility/utility.service';
import { SampleService } from '../../providers/sample.service';


@IonicPage()
@Component({
  selector: 'page-scanner',
  templateUrl: 'scanner.html'
})
/**
 * https://www.djamware.com/post/59bb219f80aca768e4d2b13e/example-of-ionic-3-angular-4-cordova-barcode-and-qr-code-scanner
 */
export class ScannerPage {
  loader: any;
  sectionTab: string = "history"; startDate; endDate;
  isAndroid: boolean = false;
  isLoaded: boolean;
  products: any[] = [];
  selectedProduct: any;
  productFound: boolean = false;

  constructor(public navCtrl: NavController, public quickbooksService: QuickbooksService,
    public loadingCtrl: LoadingController, platform: Platform,
    public utilityService: UtilityService, private barcodeScanner: BarcodeScanner,
    private toast:Toast, public sampleService: SampleService

  ) {

  
    this.sampleService.getProducts()
      .subscribe((response) => {
        this.products = response.json()
        console.log(this.products);
      });
  }

  ionViewDidLoad() {
   
  }

  scan() {
    this.selectedProduct = {};
    this.barcodeScanner.scan().then((barcodeData) => {
      this.selectedProduct = this.products.find(product => product.plu === barcodeData.text);
      if(this.selectedProduct !== undefined) {
        this.productFound = true;
      } else {
        this.productFound = false;
        this.toast.show(`Product not found`, '5000', 'center').subscribe(
          toast => {
            console.log(toast);
          }
        );
      }
    }, (err) => {
      this.toast.show(err, '5000', 'center').subscribe(
        toast => {
          console.log(toast);
        }
      );
    });
  }

  itemSelected(item){
    
    /*
    this.navCtrl.push('TxndetailsPage', {
      item: item
    });
    */
    console.log("go to vehicle details")
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
