import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { UtilityService } from '../../utility/utility.service';
@IonicPage()
@Component({
  selector: 'page-support',
  templateUrl: 'support.html'
})
export class SupportPage {

  segment = 'all';

  constructor(public navCtrl: NavController,
    public utilityService: UtilityService
  ) {

  }

  presentLoadingCustom(){
    this.utilityService.presentLoadingCustom();
  }

  updateSchedule() {
    console.log("this.segment :: " + this.segment);
  }

  presentMorePopover(event: Event) {

    var item = 'Just for testing purpose';   

    this.utilityService.presentMorePopover(event, item);
  }

}
