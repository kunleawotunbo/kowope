import { Component } from '@angular/core';
import { NavController, IonicPage, PopoverController, DateTime } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { GpslocationPopoverPage } from '../gpslocation-popover/gpslocation-popover';
import { SharePopoverPage } from '../share-popover/share-popover';
import { UtilityService } from '../../utility/utility.service';

@IonicPage()
@Component({
  selector: 'page-gpslocation',
  templateUrl: 'gpslocation.html'
})
export class GpslocationPage {

  location: {
    latitude: number,
    longitude: number,
    accuracy: number,
    altitude: number,
    altitudeAccuracy: number,
    heading: number,
    speed: number
  };
  geoposition: {
    coords: any,
    timestamp: number
  };
  dms: {
    lat: {},
    latDegrees: number,
    latMinutes: number,
    latSeconds: number,
    latCardinal: string,
    lng: {},
    lngDegrees: number,
    lngMinutes: number,
    lngSeconds: number,
    lngCardinal: string
  }
  date: number;
  isReady: boolean;
  lat: number; long;

  constructor(public navCtrl: NavController,
    private geolocation: Geolocation,
    public popoverCtrl: PopoverController,
    public utilityService: UtilityService,
    private launchNavigator: LaunchNavigator
  ) {


    this.getCurrentPosition();
  }

  ionViewDidLoad() {
    //this.getCurrentPosition();
  }

  //Every time you enter the view, get the current location
  //You need to call your logic after your lat and long have been set

  ionViewWillEnter() {

  }

  getCurrentPosition() {
    this.geolocation.getCurrentPosition().then((resp) => {

      this.location = {
        latitude: resp.coords.latitude,
        longitude: resp.coords.longitude,
        accuracy: resp.coords.accuracy,
        altitude: resp.coords.altitude,
        altitudeAccuracy: resp.coords.altitudeAccuracy,
        heading: resp.coords.heading,
        speed: resp.coords.speed
      };

      this.geoposition = {
        coords: resp.coords,
        timestamp: resp.timestamp
      }

      let latObj = this.utilityService.toDegreesMinutesAndSeconds2(resp.coords.latitude);
      let lngObj = this.utilityService.toDegreesMinutesAndSeconds2(resp.coords.longitude);
      this.dms = {
        lat: latObj,
        latDegrees: latObj.degrees,
        latMinutes: latObj.minutes,
        latSeconds: latObj.seconds,
        latCardinal: Math.sign(resp.coords.latitude) >= 0 ? "N" : "S",
        lng: lngObj,
        lngDegrees: lngObj.degrees,
        lngMinutes: lngObj.minutes,
        lngSeconds: lngObj.seconds,
        lngCardinal: Math.sign(resp.coords.longitude) >= 0 ? "E" : "W"
      }

      this.date = Date.now();
      this.isReady = true;

    }).catch((error) => {
      console.log(error);
    });
  }

  watchPosition() {
    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
    });
  }

  presentPopover(event: Event) {

    var item = 'Just for testing purpose';

    //let popover = this.popoverCtrl.create(GpslocationPopoverPage);

    // Pass data to the popover and also add cssClass to customize the popover
    // the cssClass is located in the app.scss
    let popover = this.popoverCtrl.create(GpslocationPopoverPage, {
      item: item
    }, {
      cssClass: 'custom-popover'
      }
    );

    popover.present({ ev: event });
  }

  share(event: Event) {
    // var msg = this.quotes[index].content + "-" + this.quotes[index].title ;
    var msg = this.location.latitude;

    // Pass data to the popover and also add cssClass to customize the popover
    // the cssClass is located in the app.scss
    let popover = this.popoverCtrl.create(SharePopoverPage, {
      msg: msg
    }, {
      cssClass: 'custom-popover'
      }
    );


    console.log("event :: " + event);
    popover.present({ ev: event });
  }

  launchMapNavigator(lat, lng){
    let options: LaunchNavigatorOptions = {
      //start: 'London, ON',
     // app: LaunchNavigator.APPS.UBER
    };
    
   // destination	string|Array.<number>	Location name or coordinates (as string or array)
   let destination = lat +','+lng;
    // this.launchNavigator.navigate('Toronto, ON', options)
    this.launchNavigator.navigate(destination, options)
      .then(
        success => console.log('Launched navigator'),
        error => console.log('Error launching navigator', error)
      );
  }


}
