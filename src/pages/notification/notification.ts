import { Component } from '@angular/core';
import { NavController, IonicPage, Platform } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';

//declare var FCMPlugin;

@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html'
})
export class NotificationPage {
  results: string;
  constructor(public navCtrl: NavController,
    private localNotifications: LocalNotifications,
    private platform: Platform
  ) {

    //this.plt.ready().then((readySource) => {
    this.localNotifications.on('click');
    //});  

    //this.onNotification();

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

  /*
  getToken() {
    FCMPlugin.getToken(
      (t) => {
        console.log(t);
      },
      (e) => {
        console.log(e);
      }
    );
  }

  async onNotification() {

    try {
      await this.platform.ready();
      FCMPlugin.onNotification(
        (data) => {
          console.log(data);
        },
        (e) => {
          console.log(e);
        }
      );
    }catch (e){
      console.log("error :: " + e);
    }
    
  }
  */
}

