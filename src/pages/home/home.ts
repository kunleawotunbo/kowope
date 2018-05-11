import { Component } from '@angular/core';
import { NavController, IonicPage, PopoverController } from 'ionic-angular';
import { UtilityService } from '../../utility/utility.service';
import { MorePopoverPage } from '../more-popover/more-popover';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, 
    public popoverCtrl: PopoverController,
    public utilityService: UtilityService,
  ) {

  }

  presentMorePopover(event: Event) {

    var item = 'Just for testing purpose';
    /*
    // Pass data to the popover and also add cssClass to customize the popover
    // the cssClass is located in the app.scss
    let popover = this.popoverCtrl.create(MorePopoverPage, {
      item: item
    }, {
      cssClass: 'custom-popover'
      }
    );

    popover.present({ ev: event });
    */

    this.utilityService.presentMorePopover(event, item);
  }

}
