import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UtilityService } from '../../utility/utility.service';
import { Geolocation } from '@ionic-native/geolocation';

declare var google;

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})

// https://www.joshmorony.com/creating-an-advanced-google-maps-component-in-ionic-2/
// https://www.joshmorony.com/ionic-2-how-to-use-google-maps-geolocation-video-tutorial/
export class MapPage {

  @ViewChild('map') mapElement: ElementRef;

  map: any;
  mapInitialised: boolean = false;
  apiKey: 'AIzaSyB7QaHpKcGgo-AhKTdCU1ZYGa5yVE9OJhE';
  //geolocation : Geolocation;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public utilityService: UtilityService, public geolocation: Geolocation
  ) {
    //this.loadGoogleMaps();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Map');

    //this.loadMap();
    this.loadGoogleMaps();
  }

  addMarker() {
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });

    let content = "<h4>Information!</h4>";
    this.addInfoWindow(marker, content);
  }

  addInfoWindow(marker, content) {

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });

  }

  loadMap() {

  }

  loadGoogleMaps() {

    this.addConnectivityListeners();

    if (typeof google == 'undefined' || typeof google.maps == "undefined") {
      console.log("Google maps JavaScript need to be loaded.");
      this.disableMap();

      if (this.utilityService.isOnline()) {
        console.log("Online, loading map");

        // Load the SDK
        window['mapInit'] = () => {
          this.initMap();
          this.enableMap();
        }

        let script = document.createElement("script");
        script.id = "googleMaps";

        if (this.apiKey) {
          script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
        } else {
          script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';
        }

        document.body.appendChild(script);
      }
    } else {

      if (this.utilityService.isOnline()) {
        console.log("Showing map");
        this.initMap();
        this.enableMap();
      } else {
        console.log("disabling map");
        this.disableMap();
      }
    }

  }


  initMap() {
    this.mapInitialised = true;

    this.geolocation.getCurrentPosition().then((position) => {

      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);     

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });

   // let content = "<h4>Information!</h4>";
   let content = "<strong>Latitude:</strong> " + `${position.coords.latitude}` + " | <strong>Longitude:</strong>" + `${position.coords.longitude}` + " <br><br>";
   
    this.addInfoWindow(marker, content);

    }, (err) => {
      console.log(err);
    });
  }


  disableMap() {
    console.log("Disable map");
  }

  enableMap() {
    console.log("Enable map");
  }

  addConnectivityListeners() {
    let onOnline = () => {
      setTimeout(() => {
        if (typeof google == "undefined" || typeof google.maps == "undefined") {
          this.loadGoogleMaps();
        } else {
          if (!this.mapInitialised) {
            this.initMap();
          }

          this.enableMap();
        }
      }, 2000);

    };

    let onOffline = () => {
      this.disableMap();
    };

    document.addEventListener('online', onOnline, false);
    document.addEventListener('offline', onOffline, false);

  }


}
