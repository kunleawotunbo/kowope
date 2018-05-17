import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { UtilityService } from '../../utility/utility.service';

@IonicPage()
@Component({
  selector: 'page-others',
  templateUrl: 'others.html'
})
export class OthersPage {

  items: Array<{ title: string, icon: string, component: any }>;
  constructor(public navCtrl: NavController,
    public utilityService: UtilityService
  ) {

    this.items = [
      { title: 'USSD', icon: 'home', component: 'UssdPage' },
      { title: 'SMS OTP', icon: 'lock', component: 'SmsotpPage' },
      { title: 'Verify OTP', icon: 'body', component: 'SmsOtpReceivePage' },
      { title: 'Notification', icon: 'alarm', component: 'NotificationPage' },
      { title: 'GPS Location', icon: 'locate', component: 'GpslocationPage' },
      { title: 'Scanner', icon: 'qr-scanner', component: 'ScannerPage' },
      { title: 'Map', icon: 'map', component: 'MapPage' },
      { title: 'Fingerprint', icon: 'lock', component: 'FingerprintPage' },
    ];
  }

  itemSelected(item) {
    if (this.utilityService.isOnline()) {
      this.navCtrl.push(item.component, {
        item: item
      });
    } else {
      this.utilityService.showNoNetworkAlert();
    }
  }

  presentMorePopover(event: Event) {

    var item = 'Just for testing purpose';   

    this.utilityService.presentMorePopover(event, item);
  }

}
