import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AdMobFree, AdMobFreeBannerConfig, /*AdMobFreeInterstitialConfig */ } from '@ionic-native/admob-free';
import { Storage } from '@ionic/storage';
import { OneSignal } from '@ionic-native/onesignal';
import { AuthService } from '../providers/auth-service';
import { UtilityService } from '../utility/utility.service';
import { ConfigService } from '../utility/config.service';

export interface PageInterface {
  title: string;
  icon: string;
  component: any
}
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  activePage: any;
  profilePicture: string;
  currentUser: any;
  isLoaded: boolean;
  pages: PageInterface[] = [
    { title: 'Home', icon: 'home', component: 'HomePage' },
    { title: 'Profile', icon: 'contact', component: 'ProfilePage' },
    { title: 'Fleet Management', icon: 'car', component: 'FleetmgtPage' },
    { title: 'Journals', icon: 'card', component: 'JournalsPage' },
    { title: 'Scanner', icon: 'qr-scanner', component: 'ScannerPage' },
    { title: 'Support', icon: 'chatbubbles', component: 'SupportPage' },
    { title: 'Payment', icon: 'card', component: 'PaymentPage' },
    { title: 'Others', icon: 'flower', component: 'OthersPage' },
  ];
  driverPages: PageInterface[] = [
    { title: 'Home', icon: 'home', component: 'HomePage' },
    { title: 'Profile', icon: 'contact', component: 'ProfilePage' },
    { title: 'Journals', icon: 'card', component: 'JournalsPage' },
  ];

  loggedOutPages: PageInterface[] = [
    { title: 'Login', icon: 'log-in', component: 'LoginPage' },
  ];


  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public storage: Storage,
    public menuCtrl: MenuController,
    public events: Events,
    public authService: AuthService,
    public utilityService: UtilityService,
    public admob: AdMobFree,
    public configService: ConfigService,
    private oneSignal: OneSignal,

  ) {
    this.initializeApp();

    this.profilePicture = "assets/images/avatar.png";

    // Listen to events
    this.listenToEvents();

    // Set active page to first page
    this.activePage = this.pages[0];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      //http://www.codingandclimbing.co.uk/blog/ionic-2-fix-splash-screen-white-screen-issue
      // Fix issue where you see a blank screen after your splash screen disappears.

      setTimeout(() => {
        this.splashScreen.hide();
      }, 100);

      //this.splashScreen.hide();

      // Set intro page
      this.storage.get('introShown').then((result) => {

        if (result) {
          this.rootPage = 'LoginPage';
          //this.rootPage = 'HomePage';
          // Set active page to first page
          //this.activePage = this.pages[0];
        } else {
          this.rootPage = 'IntroPage';
          this.storage.set('introShown', true);
          //this.activePage = this.pages[0];
        }

        //this.loader.dismiss();
      });
      //console.log("App.component.after login");
      //this.enableMenu();

      // Load AdMob
      this.initializeAds();

      // OneSignal Code start:
      // Enable to debug issues:
      //window["plugins"].OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});
      
      /*
        var notificationOpenedCallback = function (jsonData) {
          console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
        };

        window["plugins"].OneSignal
          .startInit(this.configService.getOneSignalAppId(), this.configService.getGoogleProjectId())
          .handleNotificationOpened(notificationOpenedCallback)
          .endInit();
      */

      // Initialize oneSignal
      //this.initOneSignal();

      this.initOneSignal2();

    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if (page.component === 'LoginPage') {
      this.authService.logout();
    }
    this.nav.setRoot(page.component);

    // set active page
    this.activePage = page;
  }

  ngAfterViewInit() {
    // this.getCurrentUser();
  }

  getCurrentUser() {
    this.authService.getCurrentUser().then((currentUser) => {
      this.currentUser = currentUser;
    });
  }

  ionViewDidLoad() {
    //console.log("ionViewDidLoad app.component");    
  }

  listenToEvents() {

    // Subscribe to user:login event to set the person name in the side menu    

    this.events.subscribe('user:login', (currentUser) => {
      this.currentUser = currentUser;
      if (this.currentUser === undefined) {
        this.isLoaded = false;
      } else {
        this.isLoaded = true;
      }
    });


    this.events.subscribe('user:logout', () => {
      this.authService.logout();
      this.nav.setRoot('LoginPage');
    });

    // Subscribe to picture events
    this.events.subscribe('picture:updated', (profilePiture) => {
      this.profilePicture = profilePiture;
    });

  }

  editAccount() {
    this.nav.setRoot('ProfilePage');
  }

  checkActive(page) {
    return page == this.activePage;
  }

  getLoginUserDetails() {
    this.events.subscribe('user:login', () => {

      setTimeout(function () {
        this.currentUser = this.storage.get('currentUser');
      }, 5000);

    });
  }

  logout() {
    //this.authService.logout();
    this.nav.setRoot('LoginPage');
  }

  initializeAds() {

    let bannerConfig: AdMobFreeBannerConfig = {
      isTesting: true, // Remove in production
      autoShow: true,
      id: 'ca-app-pub-3940256099942544/6300978111', // Test Id
      //id: ca-app-pub-3608321653585261/7297886466 //My live AdMob Id
    };

    this.admob.banner.config(bannerConfig);

    this.admob.banner.prepare().then(() => {
      // success
    }).catch(e => console.log(e));

  }

  initOneSignal(){
    // OneSignal Code start:
      // Enable to debug issues:
      //window["plugins"].OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});
      
        var notificationOpenedCallback = function (jsonData) {
          console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
          this.nav.setRoot('NotificationPage', {
            item: JSON.stringify(jsonData)
          });
        };

        window["plugins"].OneSignal
          .startInit(this.configService.getOneSignalAppId(), this.configService.getGoogleProjectId())
          .handleNotificationOpened(notificationOpenedCallback)
          .endInit();      
  }

  initOneSignal2() {

    
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
        // console.log('notificationOpenedCallback: ' + JSON.stringify(data));
        // alert('notificationOpenedCallback: ' + JSON.stringify(data));
        alert('notificationOpenedCallback: ' + data);
      };

      this.nav.setRoot('NotificationPage', {
        //item: JSON.stringify(data)
        item: data
      });

    });

    this.oneSignal.endInit();
  
  }
}
