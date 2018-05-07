import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { UtilityService } from '../../utility/utility.service';

@IonicPage()
@Component({
  selector: 'page-others',
  templateUrl: 'others.html'
})
export class OthersPage {

  items: Array<{title: string, icon: string, component: any}>;
  constructor(public navCtrl: NavController,
    public utilityService: UtilityService
  ) {

    this.items = [
      { title: 'USSD', icon:'home', component: 'UssdPage' },
      { title: 'SMS OTP', icon:'lock', component: 'SmsotpPage' }
    ];
  }

  itemSelected(item){
    if (this.utilityService.isOnline()) {
      this.navCtrl.push(item.component, {
        item: item
      });
    } else {
      this.utilityService.showNoNetworkAlert();
    }
  }

}