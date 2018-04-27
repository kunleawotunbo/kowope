import { Injectable } from "@angular/core";
import { Network } from '@ionic-native/network';
import { 
  Platform,
  ToastController, 
  LoadingController, 
  MenuController, 
  AlertController 
} from 'ionic-angular';
import { Storage } from '@ionic/storage';

declare var Connection;
declare var navigator;

@Injectable()
export class UtilityService {

  onDevice: boolean;
  loader: any;

  constructor(
    public platform: Platform,
    public network: Network,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public menuCtrl: MenuController,
    public storage: Storage,    
    public alertCtrl: AlertController
  ) {

    // To detect if app is running on iOS or Android
    this.onDevice = this.platform.is('cordova');
  }

  showNoNetworkAlert(){
    let alert = this.alertCtrl.create({
      title: 'No Internet Connection',
      subTitle: 'Please check your internet connection.',
      buttons: ['Ok']
    });
    alert.present();
  }

  onDisconnect() {
    // watch network for a disconnect
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      console.log('network was disconnected :-(');
    });
    return disconnectSubscription;
  }

  onConnect(){
    console.log("inside onConnect");
    let connectSubscription = this.network.onConnect().subscribe(() => {
      console.log('network connected!');
      // We just got a connection but we need to wait briefly
       // before we determine the connection type. Might need to wait.
      // prior to doing any api requests as well.
      /*
      setTimeout(() => {
        if (this.network.type === 'wifi') {
          console.log('we got a wifi connection, woohoo!');
        }
      }, 3000);
      */
    });

    return connectSubscription;
  }


  getCurrentUser(): Promise<any> {
    return this.storage.ready().then(() => {
      this.storage.get('currentUser');
    });
  }


  /**
   * Determine menu to show based on logged in user
   * @param loggedInType 
   */
  determineMenu(loggedInType) {
    switch (loggedInType) {
      case 1:
        // Enable admin menu
        //console.log("case 1");
        this.enableAdminMenu();
        break;
      case 2:
        // Enable driver menu
        //console.log("case 2");
        this.enableDriverMenu();
        break;
      case 3:
        //console.log("case 3");
        break;
      default:
        //console.log("case default");
        // When unable to determined logged in user
        this.enableLoggedOutMenu();
    }
  }

  /**
   * Implemented MenuController, to enable admin menu
   */
  enableAdminMenu() {
    this.menuCtrl.enable(true, 'adminMenu');
    this.menuCtrl.enable(false, 'driverMenu');
    this.menuCtrl.enable(false, 'loggedOutMenu');
  }

  enableDriverMenu() {
    this.menuCtrl.enable(false, 'adminMenu');
    this.menuCtrl.enable(true, 'driverMenu');
    this.menuCtrl.enable(false, 'loggedOutMenu');
  }

  enableLoggedOutMenu() {
    this.menuCtrl.enable(false, 'adminMenu');
    this.menuCtrl.enable(false, 'driverMenu');
    this.menuCtrl.enable(true, 'loggedOutMenu');
  }


  // Check if device is onfline
  isOnline1(): boolean {
    //this.network.onConnect
    /*
    if (navigator.connection) {
      console.log("I am online");
      // console.log("navigator.connection.type :: " + navigator.connection.type);
      // console.log("Connection.NONE :: " + Connection.NONE);
      return navigator.connection.type !== Connection.NONE;
    } else {
      console.log("isOnline1 else..");
      return navigator.onLine;
    }
    */
    //this.network.
    return navigator.onLine;
  }

  // Check if device is onfline
  isOnline(): boolean {
    //this.network.onConnect
    if (this.onDevice && navigator.connection) {
      console.log("I am online");
      // console.log("navigator.connection.type :: " + navigator.connection.type);
      // console.log("Connection.NONE :: " + Connection.NONE);
      return navigator.connection.type !== Connection.NONE;
    } else {
      return navigator.onLine;
    }
  }

  // Check if device is offline
  isOffline(): boolean {
    if (this.onDevice && navigator.connection) {
      return navigator.connection.type === Connection.NONE;
    } else {
      return !navigator.onLine;
    }
  }

  showNoNetworkToast() {
    let toast = this.toastCtrl.create({
      message: 'Unable to connect to the internet. Please check your settings',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  public parseDate(dateString: string) {
    //var mL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var mS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

    var date = new Date(dateString);
    var day = date.getDate();
    var month = date.getMonth(); // 0 is January;
    var year = date.getFullYear();

    var dDate = this.ordinal_suffix_of(day) + ' ' + mS[month] + ', ' + year;

    return dDate;
  }

  /**
   * https://stackoverflow.com/questions/13627308/add-st-nd-rd-and-th-ordinal-suffix-to-a-number/13627586
   * @param i 
   */
  public ordinal_suffix_of(i) {
    var j = i % 10,
      k = i % 100;
    if (j == 1 && k != 11) {
      return i + "st";
    }
    if (j == 2 && k != 12) {
      return i + "nd";
    }
    if (j == 3 && k != 13) {
      return i + "rd";
    }
    return i + "th";
  }

  public checkSubStatus(sub_expired: string) {
    return (sub_expired == 'true');
  }

  // push data to array
  pushToArray(data) {
    var dataProvider = [];
    var resultArray = [];
    resultArray = data;

    for (var i = 0; i < resultArray.length; i++) {
      dataProvider.push({

        title: resultArray[i].title,
        date: this.parseDate(resultArray[i].created_at),
        id: resultArray[i].id,


      });
    }
    return dataProvider;
  }

  formatDate(dateString: string) {
    var date = new Date(dateString);

    var dd = date.getDate();
    var mm = date.getMonth() + 1; //January is 0!
    var hour = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();

    var yyyy = date.getFullYear();

    var today = dd + '-' + mm + '-' + yyyy + ' ' + hour + ':' + minutes + ':' + seconds;

    return today;

  }

  showNotification(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 5000,
      position: 'bottom'
    });
    toast.present();
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      spinner: 'bubbles',
      
      duration: 3000000
    });
    this.loader.present();
  }

  
  presentLoadingWithTimer(duration) {
    this.loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: duration
    });
    this.loader.present();
  }

  loadingDismiss() {
    this.loader.dismiss();
    //if(this.loader !== undefined){
    //  this.loader.dismiss();
    // }
  }

  presentLoadingCustom() {
    this.loader = this.loadingCtrl.create({
      spinner: 'hide',
      /*content: `
        <div class="loading-custom-spinner-container">
          <div class="loading-custom-spinner-box"></div>
        </div>
        <div>This is a custom spinner. It will dismiss after 3 seconds.</div>`,
        */
      content: `
        <img src="assets/images/spinner.gif" />`,
      duration: 3000
    });

    this.loader.present();
  }
}