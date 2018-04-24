import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { AuthService } from '../providers/auth-service';
import { UtilityService } from '../utility/utility.service';

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
  // pages: Array<{ title: string, icon: string, component: any }>;
  // driverMenu: Array<{ title: string, icon: string, component: any }>;
  clientId: string; name;
  //profilePicture: any = "https://www.gravatar.com/avatar/";
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
    { title: 'Log out', icon: 'log-out', component: 'LoginPage' }
  ];
  driverPages: PageInterface[] = [
    { title: 'Home', icon: 'home', component: 'HomePage' },
    { title: 'Profile', icon: 'contact', component: 'ProfilePage' },
    { title: 'Journals', icon: 'card', component: 'JournalsPage' },
    { title: 'Log out', icon: 'log-out', component: 'LoginPage' }
  ];

  loggedOutPages: PageInterface[] = [
    { title: 'Home', icon: 'home', component: 'HomePage' },
    { title: 'Log out', icon: 'log-out', component: 'LoginPage' }
  ];


  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public storage: Storage,
    public menuCtrl: MenuController,
    public events: Events,
    public authService: AuthService,
    public utilityService: UtilityService
  ) {
    this.initializeApp();

    this.clientId = "11151989";
    this.profilePicture = "assets/images/avatar.png";

    // Listen to events
    this.listenToEvents();

    //this.getLoginUserDetails();

    /*
    this.clientId = "11151989";
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (this.currentUser) {
      this.isLoaded = true;
    }
    */


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
    console.log("ionViewDidLoad app.component");
    // this.clientId = "11151989";
    /*
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (this.currentUser) {
      this.isLoaded = true;
    }
    */
  }

  listenToEvents(){
    
    // Subscribe to user:login event to set the person name in the side menu
    this.events.subscribe('user:loginTEST', (currentUser) => {
      // this.currentUser = this.storage.get('currentUser');
      /*
      this.getCurrentUser();
      this.currentUser = JSON.parse(this.currentUser);
      console.log("this.currentUser :: " + this.currentUser);
      console.log("this.currentUser.first_name :: " + this.currentUser.first_name);
      */

      /*
      setTimeout(function () {
        this.storage.get('currentUser').then(result => {
          this.currentUser = result;
        });
        console.log("this.currentUser  :: " + this.currentUser );
        this.isLoaded = true;
      }, 5000);
      */

      /*
      this.storage.get('currentUser').then(result => {
        console.log("Inside storage then...");
        console.log("result :: " + result);
        this.currentUser = result;
        if (this.currentUser === null){
          this.isLoaded = false;
        } else {
          this.isLoaded = true;
        }
        
      });
      */

      //this.name = "Babatunde";
      //this.isLoaded = true;
    });

    this.events.subscribe('user:login', (currentUser) => { 
      this.currentUser = currentUser;
      if (this.currentUser === undefined){
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

  getLoginUserDetails(){
    this.events.subscribe('user:login', () => {

    setTimeout(function () {
      this.currentUser =  this.storage.get('currentUser');
    }, 5000);

    });
  }
}
