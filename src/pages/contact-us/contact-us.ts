import { Component, ViewChild, OnInit, Renderer, ElementRef } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { CallNumber } from '@ionic-native/call-number';
import { UtilityService } from '../../utility/utility.service';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'
 
declare var google: any;

@IonicPage()
@Component({
  selector: 'page-contact-us',
  templateUrl: 'contact-us.html'
})
export class ContactUsPage implements OnInit {

  accordionExpanded: boolean;
  @ViewChild("cc") cardContent: any;
  @ViewChild('mapCanvas') mapElement1: ElementRef;
  @ViewChild('map') mapElement: ElementRef;


  map: any;
  mapInitialised: boolean = false;
  apiKey: 'AIzaSyB7QaHpKcGgo-AhKTdCU1ZYGa5yVE9OJhE';
  phoneNumber: string;

  diseases = [
    { title: "Type 1 Diabetes", description: "Type 1 diabetes is an autoimmune disease in which the body’s immune system attacks and destroys the beta cells in the pancreas that make insulin." },
    { title: "Multiple Sclerosis", description: "Multiple sclerosis (MS) is an autoimmune disease in which the body's immune system mistakenly attacks myelin, the fatty substance that surrounds and protects the nerve fibers in the central nervous system." },
    { title: "Crohn's & Colitis", description: "Crohn's disease and ulcerative colitis (UC), both also known as inflammatory bowel diseases (IBD), are autoimmune diseases in which the body's immune system attacks the intestines." },
    { title: "Lupus", description: "Systemic lupus erythematosus (lupus) is a chronic, systemic autoimmune disease which can damage any part of the body, including the heart, joints, skin, lungs, blood vessels, liver, kidneys and nervous system." },
    { title: "Rheumatoid Arthritis", description: "Rheumatoid arthritis (RA) is an autoimmune disease in which the body's immune system mistakenly begins to attack its own tissues, primarily the synovium, the membrane that lines the joints." }
  ];

  shownGroup = null;

  information: any[];

  constructor(public navCtrl: NavController,
    public renderer: Renderer,
    private http: Http,
    public geolocation: Geolocation,
    public utilityService: UtilityService,
    private callNumber: CallNumber
  ) {
      this.phoneNumber = "+2347031528126";
      let localData = this.http.get('assets/data/information.json').map(res => res.json().items);
    localData.subscribe(data => {
      this.information = data;
    })
  }

  ngOnInit() {
   // console.log(this.cardContent.nativeElement);
   // this.renderer.setElementStyle(this.cardContent.nativeElement, "webkitTransition", "max-height 500ms, padding 500ms");
  }

  ionViewDidLoad(){
    // this.loadMap();
    // this.initMap();
    this.loadGoogleMaps();
  }

  callPhoneNumber(){
     console.log("passedNumber :: " + this.phoneNumber);
     this.callNumber.callNumber(this.phoneNumber, true)
      .then((data) => {
        console.log('Launched dialer!'+ data);
      })
      .catch(() => console.log('Error launching dialer'));
  }

  toggleAccordion() {
    // Check if according is collasped
    if (this.accordionExpanded) {
      this.renderer.setElementStyle(this.cardContent.nativeElement, "max-height", "0px");
      this.renderer.setElementStyle(this.cardContent.nativeElement, "padding", "0px 16px");
    } else {
      this.renderer.setElementStyle(this.cardContent.nativeElement, "max-height", "500px");
      this.renderer.setElementStyle(this.cardContent.nativeElement, "padding", "13px 16px");
    }
    // Change this.accordionExpanded value everytime its toggled
    this.accordionExpanded = !this.accordionExpanded;
  }

  toggleGroup(group) {
    if (this.isGroupShown(group)) {
      this.shownGroup = null;
    } else {
      this.shownGroup = group;
    }
  };
  isGroupShown(group) {
    return this.shownGroup === group;
  };

  toggleSection(i) {
    this.information[i].open = !this.information[i].open;
  }
 
  toggleItem(i, j) {
    this.information[i].children[j].open = !this.information[i].children[j].open;
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
