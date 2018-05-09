import { Component } from '@angular/core';
import { NavController, IonicPage, Platform, AlertController, NavParams } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { OneSignal } from '@ionic-native/onesignal';
import { ConfigService } from '../../utility/config.service';

//declare var FCMPlugin;

@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html'
})
export class NotificationPage {
  results: string;
  data: any;

  constructor(public navCtrl: NavController,
    private localNotifications: LocalNotifications,
    private platform: Platform,
    private oneSignal: OneSignal,
    public configService: ConfigService,
    public alertCtrl: AlertController,
    public navParams: NavParams
  ) {
    console.log("Inside notification page");
    this.data = this.navParams.get('item');

    this.platform.ready().then((readySource) => {
      //this.localNotifications.on('click');
      //this.initOneSignal();
    });

    //this.onNotification();

  }

  ionViewDidLoad(){
    let alert = this.alertCtrl.create({
      title: 'Simple Notification',
      subTitle: this.data,
      buttons: ['Ok']
    });
    alert.present();
  }

  showNotification() {
    // Schedule delayed notification
    this.localNotifications.schedule({
      title: 'Sample Notification',
      text: 'Delayed ILocalNotification',
      trigger: { at: new Date(new Date().getTime() + 3600) },
      led: 'FF0000',
      sound: null,
      icon: 'assets/images/forgotpwd.png'
    });
  }

  initOneSignal() {

    
    this.oneSignal.startInit(this.configService.getOneSignalAppId(), this.configService.getGoogleProjectId());

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

    this.oneSignal.handleNotificationReceived().subscribe((data) => {
      // do something when notification is received
      console.log('Tapped', data);

    });

    this.oneSignal.handleNotificationOpened().subscribe((data) => {
      // do something when a notification is opened
      //consol
      var notificationOpenedCallback = function (data) {
        console.log('notificationOpenedCallback: ' + JSON.stringify(data));
      };

      let alert = this.alertCtrl.create({
        title: 'Handle Notification',
        subTitle: JSON.stringify(data),
        buttons: ['Ok']
      });
      alert.present();
    });

    this.oneSignal.endInit();
    

    // OneSignal Code start:
    // Enable to debug issues:
    // window["plugins"].OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});

    /*
    var notificationOpenedCallback = function (jsonData) {
      console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
    };

    window["plugins"].OneSignal
      .startInit(this.configService.getOneSignalAppId(), this.configService.getGoogleProjectId())
      .handleNotificationOpened(notificationOpenedCallback)
      .endInit();
    */
  }

  
}

